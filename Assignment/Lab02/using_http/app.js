const http = require("http");
const path = require("path");
require("dotenv").config();
const fs = require("fs");

const handleGetRequest = function(res, err, buffer){
    let statusCode;
    let fileBuffer;
    if(err){
        statusCode = 404;
        fileBuffer = process.env.MSG_404;
    } else{
        statusCode = 200;
        fileBuffer = buffer;
    }
    
    res.setHeader("Content-Type", "text/html");
    res.writeHead(statusCode)
    res.end(fileBuffer);
}
const handlePostRequest = function(res, err, buffer){
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200)
    res.end(buffer);
}
const listenAllRequest = function(req, res){
    const folder_name = "public";
    const page1 = "page1.html";
    const page2 = "page2.html";
    const index = "index.html";
    if(req.method=="GET"){
        switch(req.url){
            case "/"+page1:
                fs.readFile(path.join(__dirname, folder_name, page1), function(err, buffer){
                    handleGetRequest(res, err, buffer);
                });
                break;
            case "/"+page2:
                fs.readFile(path.join(__dirname, folder_name, page2), function(err, buffer){
                    handleGetRequest(res, err, buffer);
                });
                break;
            default:
                fs.readFile(path.join(__dirname, folder_name, index), function(err, buffer){
                    handleGetRequest(res, err, buffer);
                });
                break;
        }
    } else{
        handlePostRequest(res, null, process.env.JSON_DATA);
    }
}

const server = http.createServer(listenAllRequest);
server.listen(process.env.PORT, process.env.HOSTNAME, function(){
    console.log(process.env.MSG_PORT_LISTEN, "http://"+process.env.HOSTNAME+":"+process.env.PORT);
});