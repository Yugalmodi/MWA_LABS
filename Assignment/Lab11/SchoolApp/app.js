require("dotenv").config();
require("./api/data/db");
const exp = require("constants");
const express = require("express");
const app = express();

const routes = require("./api/routes");

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


app.use("/api", function(req, res, next){
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', "GET");
    res.header('Access-Control-Allow-Headers', 
            "Content-Type, X-Requested-With, pragma, Origin, Accept");
    next();
});

app.use(function(req, res, next){
    console.log(req.method, "-", req.url);
    next();
});
app.use("/api", routes);

const path = require("path")
app.use(express.static(path.join(__dirname, "./public")));

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to port", server.address().port);
});
