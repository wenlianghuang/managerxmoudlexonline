
#!/bin/bash
#frequency=0
#while [ "${frequency}" < "100" ]
while [ 1 ]
do
    sleep 120s
    echo "Start to build frontend and combine to backend"
    cd ./client
    npm run build
    mv ./build ../server/
    cd ../server
    go run main.go
    
    #frequency=$(($frequency+1))
done
