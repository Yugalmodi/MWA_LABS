const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
});
const jobSchema = mongoose.Schema({
    title:{
        type:String, 
        required:true
    },
    salary:{
        type:Number, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    experience:{
        type:Number,
        default:0
    },
    postDate:{
        type:Date, 
        default:Date.now
    },
    location:{ locationSchema},
    skills:[String]
});

mongoose.model(process.env.MODEL_NAME, jobSchema, process.env.COLL_NAME)