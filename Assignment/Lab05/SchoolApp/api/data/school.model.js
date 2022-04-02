const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        min:1,
        max:3,
        required:true
    }
});

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gpa:{
        type:Number
    },
    courses:[courseSchema]
});

mongoose.model(process.env.MODEL_STU, studentSchema, process.env.COLL_NAME);