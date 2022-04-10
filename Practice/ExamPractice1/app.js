require("dotenv").config();
require("./api/data/db");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const _handleConnection = function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.header('Access-Control-Allow-Headers', 
            'Content-Type, X-Requested-With, Origin, Accept, Pagma');
    next();
}
app.use("/api", _handleConnection);

const _handleLogCall = function(req, res, next){
    console.log(req.method, "-", req.url);
    next();
}
app.use(_handleLogCall);

const router = require("./api/router");
app.use("/api", router);

const _handleServer = function(){
    console.log("Server is listinging the port", server.address().port);
}
const server = app.listen(process.env.PORT, _handleServer);