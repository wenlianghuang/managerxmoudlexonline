package middleware

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var (
	TokenExpired     error  = errors.New("Token is expired")
	TokenNotValidYet error  = errors.New("Token not active yet")
	TokenMalformed   error  = errors.New("That's not even a token")
	TokenInvalid     error  = errors.New("Couldn't handle this token:")
	SignKey          string = "bgbiao.top" //簽名訊息應該設置成動態庫中獲取
)

// JWTAuth middleware，檢查token
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Request.Header.Get("token")
		if token == "" {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "請求未攜帶token，無權限訪問",
				"data":   nil,
			})
			c.Abort()
			return
		}

		log.Print("get token: ", token)
		j := NewJWT()
		// 解析token中包含的相關訊息
		claims, err := j.ParserToken(token)

		fmt.Println(claims, err)
		if err != nil {
			// token過期
			if err == TokenExpired {
				c.JSON(http.StatusOK, gin.H{
					"status": -1,
					"msg":    "token授權已過期，請重新申請授權",
					"data":   nil,
				})
				c.Abort()
				return
			}

			// 其他錯誤
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    err.Error(),
				"data":   nil,
			})
			c.Abort()
			return
		}

		// 解析到具體的claims相關訊息
		c.Set("claims", claims)

	}
}

// JWT基本數據結構
// 簽名的signkey
type JWT struct {
	SigningKey []byte
}

// 定義載荷
type CustomClaims struct {
	Name  string `json:"userName"`
	Email string `json:"email"`
	// StandardClaims結構體實現了Claims接口(Valid()函數)
	jwt.StandardClaims
}

// 初始化JWT實例
func NewJWT() *JWT {
	return &JWT{
		[]byte(GetSignKey()),
	}
}

// 獲取signkey(這裡寫死成一個變量了)
func GetSignKey() string {
	return SignKey
}

func SetSignKey(key string) string {
	SignKey = key
	return SignKey
}

// 創建Token(基於用戶的基本訊息claims)
// 使用HS256演算法進行token生成
// 使用用戶基本訊息claims以及簽名key(signkey)生成token
func (j *JWT) CreateToken(claims CustomClaims) (string, error) {
	// https://gowalker.org/github.com/dgrijalva/jwt-go#Token
	// 返回一個token的結構體pointer
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(j.SigningKey)
}

// token解析
// Couldn't handle this token:
func (j *JWT) ParserToken(tokenString string) (*CustomClaims, error) {
	// https://gowalker.org/github.com/dgrijalva/jwt-go#ParseWithClaims
	// 輸入用戶自定義的Claims結構體對象,token,以及自定義函數來解析token字串為jwt的Token結構體pointer
	// Keyfunc是匿名和數類型: type Keyfunc func(*Token) (interface{}, error)
	// func ParseWithClaims(tokenString string, claims Claims, keyFunc Keyfunc) (*Token, error) {}
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return j.SigningKey, nil
	})

	fmt.Println(token, err)
	if err != nil {
		// https://gowalker.org/github.com/dgrijalva/jwt-go#ValidationError
		// jwt.ValidationError 是一個無效token的錯誤結構
		if ve, ok := err.(*jwt.ValidationError); ok {
			// ValidationErrorMalformed是一個uint常數，表示token不可用
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return nil, TokenMalformed
				// ValidationErrorExpired表示Token過期
			} else if ve.Errors&jwt.ValidationErrorExpired != 0 {
				return nil, TokenExpired
				// ValidationErrorNotValidYet表示無效token
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				return nil, TokenNotValidYet
			} else {
				return nil, TokenInvalid
			}

		}
	}

	// 將token中的claims訊息解析出來和用戶原始數據進行校對
	// 座椅下類型斷言，將token.Claims轉換成具體用戶自定義的Claims結構體
	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, TokenInvalid

}

// 更新Token
func (j *JWT) UpdateToken(tokenString string) (string, error) {
	// TimeFunc為一個default是time.Now的當前時間變數，用來解析token後進行過期時間驗證
	// 可以使用其他的時間值來覆蓋
	jwt.TimeFunc = func() time.Time {
		return time.Unix(0, 0)
	}

	// 拿到token基礎數據
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return j.SigningKey, nil

	})

	// 校對token當前還有效
	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		jwt.TimeFunc = time.Now
		// 修改Claims的過期時間(int64)
		// https://gowalker.org/github.com/dgrijalva/jwt-go#StandardClaims
		claims.StandardClaims.ExpiresAt = time.Now().Add(1 * time.Hour).Unix()
		return j.CreateToken(*claims)
	}
	return "", fmt.Errorf("token获取失败:%v", err)
}
