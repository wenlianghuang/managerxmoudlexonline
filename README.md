## 前端--React.js

利用react.js來開發client，詳細內容可以進入[client資料夾](http://10.36.22.111:8180/kyd200/kyd220/managerxonline/-/tree/main/client)看裡面的內容以及Readme.md，我會寫下各種資料夾以及它們之間的關聯。

## 後端--Golang

利用Golang來開發server，詳細內容可以進入[server資料夾](http://10.36.22.111:8180/kyd200/kyd220/managerxonline/-/tree/main/server)看裡面的內容，但`請注意`，server資料夾裡面的README.md是我當初為了學習跟certificate相關的內容，目前還沒有寫入跟server資料夾的`任何資訊`

之後可以有時間會再補上

## 資料庫--MySQL DB

利用MySQL來開發資料庫並聯到後端，但golang + MySQL目前沒有像phpmyadmin的網路介面話來處理資料庫

目前有幾個推薦的MySQL客戶端:

[dbForge Studio for MySQL](https://www.devart.com/dbforge/mysql/studio/?AFFILIATE=105109&__c=1)

[MySQl Workbench](https://www.mysql.com/products/workbench/)

[HeidiSQL](https://www.heidisql.com/)

[Toad Edge for MySQL](https://www.quest.com/products/toad-edge/toad-edge-mysql.aspx)

[SQLyog](https://webyog.com/product/sqlyog/)

[Navicat for MySQL](https://www.navicat.com/en/products/navicat-for-mysql)

[Aqua Data Studio](https://www.aquafold.com/aquadatastudio/)

[Valentina Studio](https://www.valentina-db.com/en/valentina-studio-overview)

[Sequel Pro](https://www.sequelpro.com/)

以上是可以參考的MySQL的IDE，但有關Golang + MySQL的網路介面化就還須努力。
  
## 前後端結合

如果只有前端，只有靜態網路，那該如何把前後端連結起來呢?其實就是先把前端module到一個package

再把pakcage放在後端裡面有行code，
```
router.Use(static.Serve("/", static.LocalFile("../client/build", true)))
```

再來就單純的利用
```
go run main.go
```
就可以執行，

至於要如何產生build/ 的資料夾可以直接參考`frontbackedn_combine.sh`的shell script