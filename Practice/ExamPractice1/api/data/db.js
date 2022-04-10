require("./jobs-model")
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

const _handleConnection = function(msg, err){
    console.log(msg, err);
}
mongoose.connection.on("connected", ()=>_handleConnection("Mongoose DB Connected ....."));
mongoose.connection.on("Disconnected", ()=>_handleConnection("Mongoose DB DisConnected ....."));
mongoose.connection.on("err", (err)=>_handleConnection("Mongoose DB Connected .....", err));

const _handleClose =function (msg){
    console.log(msg);
    process.exit(0);
}
const _handleProcess = function(msg){
    // mongoose.connections.close(()=>_handleClose(msg));
    mongoose.connection.close(()=>_handleClose(msg));
}
process.on("SIGINT", ()=> _handleProcess("Process Disconnected..."));
process.on("SIGTERM", ()=> _handleProcess("Process Terminating..."));
process.on("SIGUSR2", ()=> _handleProcess("Process Restarting..."));