require("dotenv").config();
require("./api/data/db");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use("/api", function(req, res, next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    // res.header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    // res.header('Access-Control-Allow-Headers',
    //         'Content-Type,X-Requested-With,cache-control,pragma, Origin, Accept');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
});

const myLogger = function(req, res, next){
    console.log(req.method, "-", req.url);
    next();
}
app.use(myLogger);

const routes = require("./api/routes");
app.use("/api", routes);

const handleListner = function(){
    console.log("Listening Port", listner.address().port);
}
const listner = app.listen(process.env.PORT, handleListner);