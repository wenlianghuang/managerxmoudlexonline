package model

import (
	"fmt"
	/*
		"warnning-trigger/api"
	*/
	"mattbackend/api"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	DB *gorm.DB
)

func InitMySQLCon() (err error) {
	// 可以在api裡設置成init函數
	api.ParserConfig()
	connStr := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", api.DbConfig.User, api.DbConfig.Passwd, api.DbConfig.Host, api.DbConfig.Port, api.DbConfig.Database)
	fmt.Println(connStr)
	DB, err = gorm.Open("mysql", connStr)

	if err != nil {
		return err
	}

	return DB.DB().Ping()
}
