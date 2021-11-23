/*
Copyright 2019 BGBiao Ltd. All rights reserved.
@File   : rds-disk.go
@Time   : 2019/11/11 18:22:56
@Update : 2019/11/11 18:22:56
@Author : BGBiao
@Version: 1.0
@Contact: weichaungxxb@qq.com
@Desc   : None
*/

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

// 用戶註冊接口
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

// 登錄結果
type LoginResult struct {
	Token string `json:"token"`
	// 用戶模型
	Name string `json:"name"`
	//model.User
	Pwd string `json:"pwd"`
	//model password
}

// 登錄接口 用戶名和密碼登錄
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

// token生成器
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

// 測試一個需要認證的接口
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

//Update 接口
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

type GetTemp struct {
	Id    int32  `json:"id"`
	Name  string `json:"name"`
	Pwd   string `json:"password"`
	Email string `json:"email"`
}

func GetSomeOrigin(c *gin.Context) {

	//var getres model.GetReq
	var getres model.User
	//bindErr := c.BindJSON(&getres)

	/*data := GetTemp{
		Id:    getres.Id,
		Name:  getres.Name,
		Pwd:   getres.Pwd,
		Email: getres.Email,
	}*/

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
