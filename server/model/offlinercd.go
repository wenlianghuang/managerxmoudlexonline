package model

type Offlinercd struct {
	Id            int32  `gorm:"AUTO_INCREMENT"`
	OSAttr        string `json:"osattr"`
	ModelComputer string `json:"modelcomputer"`
	ModelName     string `json:"modelname"`
	SCLVersion    string `json:"sclversion"`
	POP           string `json:"pop"`
	Split         string `json:"split"`
}

func InitOfflineRCD() {
	DB.AutoMigrate(&Offlinercd{})
}

func (offrcd *Offlinercd) OfflineRCDInsert() error {
	return DB.Model(&Offlinercd{}).Create(&offrcd).Error
}

func OfflineRCD(osattr string, modelcomputer string, modelname string, sclversion string, pop string, split string) error {
	offlinercd := Offlinercd{
		OSAttr:        osattr,
		ModelComputer: modelcomputer,
		ModelName:     modelname,
		SCLVersion:    sclversion,
		POP:           pop,
		Split:         split,
	}
	offlineErr := offlinercd.OfflineRCDInsert()
	return offlineErr
}
