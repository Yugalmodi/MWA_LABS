require("./games.model")
require("./user.model")

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const _handle = function(msg, err){
    console.log(msg, err);
}

mongoose.connection.on("connected", ()=>_handle(process.env.MSG_LOG_CONN));
mongoose.connection.on("disconnected", ()=>_handle(process.env.MSG_LOG_DIS));
mongoose.connection.on("error", (err)=>_handle(process.env.MSG_LOG_ERR, err));

const_handleCOnnectionCLose = function(msg){
    console.log(msg);
    process.exit(0);
}
const _handleProcess = function(msg){
    mongoose.connection.close(()=>const_handleCOnnectionCLose(msg));
}
process.on("SIGINT", ()=> _handleProcess(process.env.MSG_LOG_CLOSE));
process.on("SIGTERM", ()=> _handleProcess(process.env.MSG_LOG_TERM));
process.on("SIGUSR2", ()=> _handleProcess(process.env.MSG_LOG_RES));