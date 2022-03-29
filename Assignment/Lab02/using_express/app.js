const express = require("express");
const app = express();
require("dotenv").config();
app.set("port", process.env.PORT);

const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.get("*", function(req, res){
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("*", function(req, res){
    res.status(200).json({'Json_msg' : 'This  is a JSON secret message'});
});

const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_PORT_LISTEN, server.address().port);
});