require("./reciepe.model");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const connectionRes = function(log_msg){
    console.log(log_msg);
}
mongoose.connection.on("connected", ()=>connectionRes(process.env.MSG_LOG_DB_CONN));
mongoose.connection.on("disconnected", ()=>connectionRes(process.env.MSG_LOG_DB_DIS));
mongoose.connection.on("error", ()=>connectionRes(process.env.MSG_LOG_DB_ERR));

const processClose = function(log_msg){
    mongoose.connection.close(()=>mongooseCloseResponse(log_msg));
}
const mongooseCloseResponse = function(log_msg){
    console.log(log_msg);
    process.exit(0);
}
process.on("SIGINT", ()=>processClose(process.env.MSG_LOG_PRC_DIS));
process.on("SIGTERM", ()=>processClose(process.env.MSG_LOG_PRC_TERM));
process.on("SIGUSR2", ()=>processClose(process.env.MSG_LOG_PRC_RES));
