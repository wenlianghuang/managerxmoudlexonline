package model

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Uploadfilegin(c *gin.Context) {
	// single file
	router := gin.Default()
	router.MaxMultipartMemory = 8 << 20 // 8 MiB
	router.Static("/assets", "./temp")
	// single file
	file, err := c.FormFile("selectedFile")
	log.Println(file.Filename)
	if err != nil {
		fmt.Println("upload file error in server")
		panic(err)
	}
	// Upload the file to specific dst.
	c.SaveUploadedFile(file, "temp/"+file.Filename)
	c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}
