## jwt-token

使用`jwt-go`和`gin`來構建帶有token認證的api接口

**依賴環境**

`注意:` 由於用戶相關訊息是存儲在MySQL中的，因此需要先創建一個基礎數據看

```
$ docker run -itd -e MYSQL_ROOT_PASSWORD='bgbiao.top' --name go-orm-mysql  -p 13306:3306 mysql:5.6

```

之後，再項目的`config/config.ini`文件中修改數據庫相關的配置即可。

```
# 運行項目
$ go run main.go
127.0.0.1
13306
root:bgbiao.top@tcp(127.0.0.1:13306)/test_api?charset=utf8mb4&parseTime=True&loc=Local
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] POST   /apis/v1/register         --> warnning-trigger/controller.RegisterUser (3 handlers)
[GIN-debug] POST   /apis/v1/login            --> warnning-trigger/controller.Login (3 handlers)
[GIN-debug] GET    /apis/v1/auth/time        --> warnning-trigger/controller.GetDataByTime (4 handlers)
[GIN-debug] Listening and serving HTTP on :8081

# 註冊用戶
$ curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
  "name": "hahaha1",
  "password": "hahaha1",
  "email": "hahaha1@bgbiao.top",
  "phone": 10000000000
}' \
 'http://localhost:8081/apis/v1/register'
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 15 Mar 2020 07:09:28 GMT
Content-Length: 41

{"data":null,"msg":"success ","status":0}%


# 登陸用戶以獲取token
$ curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{
  "name":"hahaha1",
  "password":"hahaha1"
}' \
 'http://localhost:8081/apis/v1/login'
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 15 Mar 2020 07:10:41 GMT
Content-Length: 290

{"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhaGFoYTEiLCJlbWFpbCI6ImhhaGFoYTFAYmdiaWFvLnRvcCIsImV4cCI6MTU4NDI1OTg0MSwiaXNzIjoiYmdiaWFvLnRvcCIsIm5iZiI6MTU4NDI1NTI0MX0.HNXSKISZTqzjKd705BOSARmgI8FGGe4Sv-Ma3_iK1Xw","name":"hahaha1"},"msg":"登陆成功","status":0}


# 訪問需要認證的街口
# 因為我們對/apis/v1/auth/的分組路由中加載了jwt的middleware，因此該分組下的api都需要使用
jwt-token認證
$ curl http://localhost:8081/apis/v1/auth/time
{"data":null,"msg":"請求未攜帶token，無權限訪問"，"status":-1}%
# 使用token認證
$ curl http://localhost:8081/apis/v1/auth/time -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhaGFoYTEiLCJlbWFpbCI6ImhhaGFoYTFAYmdiaWFvLnRvcCIsImV4cCI6MTU4NDI1OTg0MSwiaXNzIjoiYmdiaWFvLnRvcCIsIm5iZiI6MTU4NDI1NTI0MX0.HNXSKISZTqzjKd705BOSARmgI8FGGe4Sv-Ma3_iK1Xw'
{"data":{"userName":"hahaha1","email":"hahaha1@bgbiao.top","exp":1584259841,"iss":"bgbiao.top","nbf":1584255241},"msg":"token有效","status":0}%

```
