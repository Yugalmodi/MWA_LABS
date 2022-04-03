require("./reciepe.model");

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log(process.env.MSG_LOG_DB_CONN);
});
mongoose.connection.on("disconnected", function(){
    console.log(process.env.MSG_LOG_DB_DIS);
});
mongoose.connection.on("error", function(){
    console.log(process.env.MSG_LOG_DB_ERR);
});
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.MSG_LOG_PRC_DIS);
        process.exit(0);
    });
});
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log(process.env.MSG_LOG_PRC_TERM);
        process.exit(0);
    });
});
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.MSG_LOG_PRC_RES);
        process.exit(0);
    });
});