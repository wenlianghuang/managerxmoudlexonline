package main

import (
	"warnning-trigger/controller"
	md "warnning-trigger/middleware"
	"warnning-trigger/model"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化db
	dbErr := model.InitMySQLCon()
	if dbErr != nil {
		panic(dbErr)
	}

	model.InitModel()
	defer model.DB.Close()

	// 初始化Gin實例
	router := gin.Default()

	// 把前端的build放在後端這裡之後一起跑
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	v1 := router.Group("/apis/v1/")
	{
		v1.POST("/register", controller.RegisterUser)
		v1.POST("/login", controller.Login)
	}
	//Get
	{
		v1.GET("/allacc", controller.GetSomeOrigin)
	}
	// secure v1
	sv1 := router.Group("/apis/v1/auth/")
	sv1.Use(md.JWTAuth())
	{
		sv1.GET("/time", controller.GetDataByTime)

	}
	// update login
	{
		v1.PUT("/Update/:id", controller.UpdateUser)
	}

	//注意，如果想要在另外台ip是內網的話，可以用 port 80取代
	router.Run("172.28.96.1:5050")
}
