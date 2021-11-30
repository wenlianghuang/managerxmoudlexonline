#!/bin/bash
while [ 1 ]
do
    echo "Start to build frontend and combine to backend"
    cd ./client
    rm -rf build
    rm -rf ../server/build
    npm run build
    cp -r ./build ../server/
    cd ../server
    go run main.go
    cd ../
    #frequency=$(($frequency+1))
done
