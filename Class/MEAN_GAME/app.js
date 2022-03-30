require("dotenv").config();
const express = require("express");
const app = express();
const routs = require("./routes");

app.set("port", process.env.PORT);

const path = require("path");

app.use("/api", routs);
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_PORT_LISTENING, server.address().port);
});