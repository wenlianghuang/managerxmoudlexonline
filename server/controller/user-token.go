package controller

import (
	"fmt"
	_ "fmt"
	"log"
	"net/http"
	"time"
	md "warnning-trigger/middleware"
	"warnning-trigger/model"

	jwtgo "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// 用戶註冊訊息
// 注意:註冊信息可以使用Gin內部的校對工具或者beego的校對工具進行校對
type RegisterInfo struct {
	Phone int64  `json:"phone"`
	Name  string `json:"name"`
	Pwd   string `json:"password"`
	Email string `json:"email"`
}

// 用戶註冊接口(User)
func RegisterUser(c *gin.Context) {
	var registerInfo RegisterInfo
	bindErr := c.BindJSON(&registerInfo)
	if bindErr == nil {
		// 用户注册
		err := model.Register(registerInfo.Name, registerInfo.Pwd, registerInfo.Email)

		if err == nil {
			c.JSON(http.StatusOK, gin.H{
				"status": 0,
				"msg":    "success ",
				"data":   nil,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "註冊失敗" + err.Error(),
				"data":   nil,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "用戶註冊相關數據失敗" + bindErr.Error(),
			"data":   nil,
		})
	}
}

// 登錄結果(User)
type LoginResult struct {
	Token string `json:"token"`
	// 用戶模型
	Name string `json:"name"`
	//model.User
	Pwd string `json:"pwd"`
	//model password
}

// 登錄接口 用戶名和密碼登錄(User)
// name,password
func Login(c *gin.Context) {
	var loginReq model.LoginReq
	if c.BindJSON(&loginReq) == nil {
		// 登錄邏輯校對
		isPass, user, err := model.LoginCheck(loginReq)
		if isPass {
			generateToken(c, user)
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "驗證失敗" + err.Error(),
				"data":   "error",
			})
		}

	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "用戶數據解析失敗",
			"data":   nil,
		})
	}
}

// token生成器(User)
func generateToken(c *gin.Context, user model.User) {

	// 構造SignKey: 簽名和解簽名需要使用一個值
	j := md.NewJWT()

	// 構造用戶claims訊息(負荷)
	claims := md.CustomClaims{
		user.Name,
		user.Email,
		jwtgo.StandardClaims{
			NotBefore: int64(time.Now().Unix() - 1000), //簽名生效時間
			ExpiresAt: int64(time.Now().Unix() + 3600), //簽名過期時間
			Issuer:    "bgbiao.top",                    //簽名頒發者
		},
	}

	// 根據claims生成token對象
	token, err := j.CreateToken(claims)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    err.Error(),
			"data":   nil,
		})
	}

	log.Println(token)

	// 獲取用戶相關數據
	data := LoginResult{
		Name:  user.Name,
		Pwd:   user.Pwd,
		Token: token,
	}

	c.JSON(http.StatusOK, gin.H{
		"status": 0,
		"msg":    "登錄成功",
		"data":   data,
	})
	return
}

// 測試一個需要認證的接口(User)
func GetDataByTime(c *gin.Context) {
	claims := c.MustGet("claims").(*md.CustomClaims)
	if claims != nil {
		c.JSON(http.StatusOK, gin.H{
			"status": 0,
			"msg":    "token有效",
			"data":   claims,
		})
	}
}

//Update 接口(User)
func UpdateUser(c *gin.Context) {
	var updateres model.UpdateReq
	//bindErr := c.BindJSON(&updateres)
	//with "PUT", gorm use "ShouldBind" instead of BindJSON
	bindErr := c.ShouldBind(&updateres)
	if bindErr == nil {
		fmt.Printf("%+v,%+v\n", updateres.Name, updateres.Pwd)
		// 修改帳號密碼
		Nowtime := time.Now()
		err := model.Update(updateres.Name, updateres.Pwd, &Nowtime)

		if err == nil {
			c.JSON(http.StatusOK, gin.H{
				"status": 0,
				"msg":    "success ",
				"data":   nil,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "帳密修改失敗" + err.Error(),
				"data":   nil,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "用戶帳密相關數據失敗" + bindErr.Error(),
			"data":   nil,
		})
	}
}

// Get 接口(User)
func GetSomeOrigin(c *gin.Context) {

	//var getres model.GetReq
	var getres model.User
	//bindErr := c.BindJSON(&getres)
	bindErr := c.ShouldBind(&getres)
	if bindErr == nil {
		err, data := model.GetAll(getres.Id, getres.Name, getres.Pwd, getres.Email)

		if err == nil {
			c.JSON(http.StatusOK, gin.H{
				"status": 0,
				"msg":    "成功顯示一些資料",
				"data":   data,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "沒找到資料!!!",
				"data":   nil,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "用戶帳密相關數據失敗" + bindErr.Error(),
			"data":   nil,
		})
	}
}

// golang struct to build a "BuildRCDTemp" 2021.11.30
type BuildRCDTemp struct {
	WOS        string `json:"wos"`
	ModelType  string `json:"modeltype"`
	ModelName  string `json:"modelname"`
	SCLVersion string `json:"sclversion"`
	POPPN      string `json:"poppn"`
}

//Function "BuildRCD" interface 2021.11.30
func BuildRCDUser(c *gin.Context) {
	var buildrcd model.Buildrcdreq

	bindErr := c.BindJSON(&buildrcd)
	data := BuildRCDTemp{
		WOS:        buildrcd.WOS,
		ModelType:  buildrcd.Modeltype,
		ModelName:  buildrcd.Modelname,
		SCLVersion: buildrcd.Sclversion,
		POPPN:      buildrcd.POPPN,
	}
	fmt.Printf("Build RCD WOS: %+v\n", buildrcd.WOS)
	fmt.Printf("All RCD: %+v\n", buildrcd)
	if bindErr == nil {
		err := model.BuildRCD(data.WOS, data.ModelType, data.ModelName, data.SCLVersion, data.POPPN)
		if err == nil {
			c.JSON(http.StatusOK, gin.H{
				"status": 0,
				"msg":    "RCD Build Successed",
				"data":   data,
			})
		} else {
			c.JSON(http.StatusOK, gin.H{
				"status": -1,
				"msg":    "Can not import to DB",
				"data":   nil,
			})
		}
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "Some Error",
			"data":   nil,
		})
	}
}

//Create POP 2021.12.01 Each variable are array
type CreatePOPReq struct {
	PreloadName       []string  `json:"preloadname"`
	PreloadCode       []string  `json:"preloadcode"`
	PreloadPopulation []int32   `json:"preloadpopulation"`
	PreloadSize       []float32 `json:"preloadsize"`
	PreloadDensity    []float32 `json:"preloaddensity"`
}

//Create POP Array 2021.12.01 useless now
//type ArrCreatePOP []CreatePOPReq

//Create POP function interface 2021.12.01
func CreatePOPUser(c *gin.Context) {
	var createpop CreatePOPReq
	bindErr := c.BindJSON(&createpop)
	fmt.Printf("First Country: +%v\n", createpop.PreloadCode[0])
	if bindErr == nil {
		//for loop of lots of checkbox 2021.12.02
		for i := 0; i < len(createpop.PreloadName); i++ {
			err := model.CreatePOP(createpop.PreloadName[i], createpop.PreloadCode[i], createpop.PreloadPopulation[i], createpop.PreloadSize[i], createpop.PreloadDensity[i])
			if err == nil {
				continue
			} else {
				fmt.Printf("Error of the array Create POP")
				c.JSON(http.StatusOK, gin.H{
					"status": -1,
					"msg":    "Error of the multi-item in many checkbox",
					"data":   nil,
				})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{
			"status": 0,
			"msg":    "success",
			"data":   createpop,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status": -1,
			"msg":    "Error",
			"data":   nil,
		})
	}
}
