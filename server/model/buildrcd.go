package model

//Build RCD "BuildRCDReq" with it's struct 2021.11.30
type Buildrcdreq struct { //BuildRCDReq
	Id         int32  `gorm:"AUTO_INCREMENT"`
	WOS        string `json:"wos"`
	Modeltype  string `json:"modeltype"`
	Modelname  string `json:"modelname"`
	Sclversion string `json:"sclversion"`
	POPPN      string `json:"poppn"`
}

func InitBuildRCD() {
	DB.AutoMigrate(&Buildrcdreq{})
}

//Insert with BuildRCD
func (brcdq *Buildrcdreq) BuildRCDInsert() error {

	return DB.Model(&Buildrcdreq{}).Create(&brcdq).Error
}

// BuildRCD start to insert to the DB and connect to BuildRCDUser function 2021.12.02
func BuildRCD(wos string, modeltype string, modelname string, sclversion string, poppn string) error {
	buildrcd := Buildrcdreq{
		WOS:        wos,
		Modeltype:  modeltype,
		Modelname:  modelname,
		Sclversion: sclversion,
		POPPN:      poppn,
	}
	buildrcderr := buildrcd.BuildRCDInsert()
	return buildrcderr
}
