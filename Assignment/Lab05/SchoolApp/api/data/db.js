const mongoose = require("mongoose");
require("./school.model")

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose DB Connected");
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose DB Disconnected");
});

mongoose.connection.on("error", function(err){
    console.log("Some error found in connection", err);
});

process.on(process.env.SIG_INT, function(){
    mongoose.connection.close(function(){
        console.log("Disconnect....");
        process.exit(0);
    });
});
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Terminating..."); 
        process.exit(0);
    });
});
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Restarting....");  
        process.exit(0);
    });
});