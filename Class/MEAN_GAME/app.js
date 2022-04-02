require("dotenv").config();
require("./data/dbConnection").open();
const express = require("express");
const app = express();
const routs = require("./routes");
app.set("port", process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const path = require("path");
const { json, urlencoded } = require("express");

app.use("/api", routs);
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_PORT_LISTENING, server.address().port);
});