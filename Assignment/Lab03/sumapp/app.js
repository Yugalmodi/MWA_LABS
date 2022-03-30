require("dotenv").config();
const express = require("express");
const app = express();
app.set("port", process.env.PORT);

const router = require("./routes");
app.use("/", router);

const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_PORT_LISTEN, server.address().port);
});