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

const reviewSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    review:{
        type:String,
        required:true
    },
    postDate:{
        type:Date,
        default:Date.now
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
    reviews:[reviewSchema],  
    minAge:{
        type:Number,
        min:1,
        max:10,
        required:true
    },
    designers:[String] 
});

mongoose.model(process.env.MODEL_GAME, gameSchema, process.env.COLL_NAME);