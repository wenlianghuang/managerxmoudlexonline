package model

import (
	"fmt"
	"testing"
)

func TestInitDb(t *testing.T) {
	connErr := InitMySQLCon()
	if connErr == nil {
		fmt.Println("資料庫連接測試通過")
	} else {
		fmt.Printf("資料庫異常:%v", connErr)
	}

	DB.Close()
}
