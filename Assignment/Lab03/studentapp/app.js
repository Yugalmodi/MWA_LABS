require("dotenv").config();
const express = require("express");
const app = express();
app.set("port", process.env.PORT);

const routs = require("./routes");
app.use("/api/", routs);

const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_PORT_LISTEN, server.address().port);
});