const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

mongoose.model(process.env.MODEL_NAME_USER, userSchema, process.env.COLL_NAME_USER);