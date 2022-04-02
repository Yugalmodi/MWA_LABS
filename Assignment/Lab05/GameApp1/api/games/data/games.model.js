const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
    },
    established:{
        type:Number,
    }
});

const gameSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    minPlayers:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
    publisher:publisherSchema,
    minAge:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
    designers:[String] 
});

mongoose.model(process.env.MODEL_GAME, gameSchema, process.env.COLL_NAME);