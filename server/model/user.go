package model

import (
	"fmt"
	"time"
)

// 構造用戶表
type User struct {
	Id        int32  `gorm:"AUTO_INCREMENT"`
	Name      string `json:"name"`
	Pwd       string `json:"password"`
	Phone     int64  `gorm:"DEFAULT:0"`
	Email     string `gorm:"type:varchar(255);unique_index;"`
	CreatedAt *time.Time
	UpdateTAt *time.Time
}

// LoginReq請求參數
type LoginReq struct {
	Name string `json:"name"`
	Pwd  string `json:"password"`
}

// UpdateReq parameter
type UpdateReq struct {
	Name      string     `json:"name"`
	Pwd       string     `json:"password`
	UpdateTAt *time.Time `json:"update_t_at"`
}

//GetReq paramter
type GetReq struct {
	Id    int32  `json:"id"`
	Name  string `json:"name"`
	Pwd   string `json:"password"`
	Email string `json:"email"`
}

// 初始化表結構以及定義
func InitModel() {
	DB.AutoMigrate(&User{})
}

// 插入數據
func (user *User) Insert() error {
	//這裡使用了Table()函數，如果你沒有指定全局表名禁用複數，或者是表明跟結構體名不一樣的時候
	//你可以自己在sql中指定表名
	// 需要注意的是Create函數的參數必須是pointer
	// return DB.Table("user").Create(user).Error
	return DB.Model(&User{}).Create(&user).Error
}

// 更新數據
func (user *User) Putup() error {

	//return DB.Model(&user).Where("name = ?", user.Name).Update("pwd", user.Pwd).Error
	fmt.Println("Update data: {}", user)
	return DB.Model(&user).Where("name = ?", user.Name).Updates(User{Pwd: user.Pwd, UpdateTAt: user.UpdateTAt}).Error
}

// 查詢數據
func (user *User) Getup() error {
	//fmt.Println("Get data: {}", user)
	//DB.Where("name = ?", "Jack").Find(&user)

	//return DB.Model(&user).Where("name = ?", user.Name).Error
	//return DB.Find(&user).Error
	return DB.Where("name = ?", user.Name).Find(&user).Error
}

// 用戶註冊
func Register(username string, pwd string, email string) error {
	fmt.Println(username, pwd, email)

	if CheckUser(username) {
		return fmt.Errorf("用戶已經存在，請直接登錄")
	}

	// 需要生成一個uuid: Id為自增
	// 構造訊息
	// derfer db.Close()
	user := User{
		Name:  username,
		Pwd:   pwd,
		Email: email,
	}
	insertErr := user.Insert()
	return insertErr

}

// 用戶檢查
func CheckUser(username string) bool {

	result := false
	// 指定庫
	var user User

	dbResult := DB.Where("name = ?", username).Find(&user)
	fmt.Println("dbResult: {}", dbResult)
	if dbResult.Error != nil {
		fmt.Printf("獲取用戶訊息失敗:%v\n", dbResult.Error)
	} else {
		result = true
	}
	return result
}

// LoginCheck驗證
func LoginCheck(login LoginReq) (bool, User, error) {
	userData := User{}
	userExist := false

	var user User
	dbErr := DB.Where("name = ?", login.Name).Find(&user).Error
	fmt.Println("dbErr from LoginCheck: {}", dbErr)
	fmt.Printf("user Name: %+v\n", user.Name)
	fmt.Printf("user Password: %+v\n", user.Pwd)
	if dbErr != nil {
		fmt.Errorf("Something Error")
		return userExist, userData, dbErr
	}
	if login.Name == user.Name && login.Pwd == user.Pwd {
		userExist = true
		userData.Name = user.Name
		userData.Pwd = user.Pwd
		userData.Email = user.Email
	}

	if !userExist {
		return userExist, userData, fmt.Errorf("登錄訊息有誤")
	}
	return userExist, userData, nil
}

func Update(username string, pwd string, update_t_at *time.Time) error {
	user := User{
		Name:      username,
		Pwd:       pwd,
		UpdateTAt: update_t_at,
	}
	updateerr := user.Putup()
	return updateerr
}

func GetAll(id int32, username string, pwd string, email string) (error, User) {
	user := User{
		Id:    id,
		Name:  username,
		Pwd:   pwd,
		Email: email,
	}

	//result := DB.Find(&user)
	//resint := result.RowsAffected
	//fmt.Println("Huang's Detail: {}", resint)
	//DB.Find(&user).Where("name", "Jack")

	//DB.Where("name = ?", "Huang").Find(&user)
	geterr := user.Getup()
	fmt.Println("User Id: {}", user.Id)
	//fmt.Printf("Geterr:%+v\n", geterr)
	return geterr, user
}
