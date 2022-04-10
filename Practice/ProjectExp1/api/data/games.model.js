const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:String,
    established:Number,
    location:{
        address:String,
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
    }
});
const reviewsSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ratnig:{
        type:Number,
        min:1,
        max:5,
        default:true
    },
    review:{
        type:String,
        required:true
    },
    postdate:{
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
    minPlayer:{
        type:Number,
        min:1,
        max:10,
        // required:true
    },
    maxPlayer:{
        type:Number,
        min:1,
        max:10,
        // required:true
    },
    publisher:{publisherSchema},
    reviews:[reviewsSchema],
    minAge:{
        type:Number,
        min:5,
        max:99,
        // required:true
    },
    desginers:[String]
});

mongoose.model(process.env.MODEL_NAME, gameSchema, process.env.COLL_NAME)