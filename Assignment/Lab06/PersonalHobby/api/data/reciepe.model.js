const mongoose = require("mongoose");
const ingredientsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String
    }
});
const receipeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    ingredients:[ingredientsSchema]
});

mongoose.model(process.env.MODEL_NAME, receipeSchema, process.env.COLL_NAME);