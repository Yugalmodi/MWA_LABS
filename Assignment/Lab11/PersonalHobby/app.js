require('dotenv-expand').expand(require("dotenv").config());
require("./api/data/db");

const express = require("express");
const app = express();

const _urlLogger = function(req, res, next){
    console.log(req.method, "-", req.url);
    next();
};
const _handleCORSPolicy = function(req, res, next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE'); 
    res.header('Access-Control-Allow-Headers',
            'Content-Type, X-Requested-With, cache-control, pragma, Origin, Accept');
    next();
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(_urlLogger);
app.use("/api", _handleCORSPolicy);

const routes = require("./api/routes");
app.use("/api", routes);

const listner = function (){
    console.log(process.env.MSG_LOG_SERVER, server.address().port);
}
const server = app.listen(process.env.PORT, listner);