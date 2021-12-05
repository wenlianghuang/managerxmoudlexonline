package model

//golang file in folder "model" 2021.12.02
type Createpopreq struct {
	Id                int32   `gorm:"AUTO_INCREMENT"`
	Preloadname       string  `json:"preloadname"`
	Preloadcode       string  `json:"preloadcode"`
	Preloadpopulation int32   `json:"preloadpopulation"`
	Preloadsize       float32 `json:"preloadsize"`
	Preloaddensity    float32 `json:"preloaddensity"`
}

func InitCreatePOP() {
	DB.AutoMigrate(&Createpopreq{})
}

func (cpr *Createpopreq) CreatePOPInsert() error {
	return DB.Model(&Createpopreq{}).Create(&cpr).Error
}

func CreatePOP(name string, code string, population int32, size float32, density float32) error {
	createpop := Createpopreq{
		Preloadname:       name,
		Preloadcode:       code,
		Preloadpopulation: population,
		Preloadsize:       size,
		Preloaddensity:    density,
	}

	createpoperr := createpop.CreatePOPInsert()
	return createpoperr
}
