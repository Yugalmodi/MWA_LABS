const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME);

const _responseAllReceipe = function(response, res, err, receipes){
    if(err){
        response.status = 500;
        response.message = err;
    } else {
        response.status = 200;
        response.message = receipes;
    }
    res.status(response.status).json(response.message);
}
const getAll = function(req, res){
    let response ={
        status:200, 
        message: process.env.MSG_RES_DEFAULT
    }
    let offset = 0;
    let count = 3;
    let maxCount = 10;
    if(req.query && req.query.offset){
        offset = req.query.offset;
    }
    if(req.query && req.query.count){
        count = req.query.count;
    }
    if(isNaN(offset) || isNaN(count)){
        response.status = 400;
        response.message = process.env.MSG_RES_NaN;
    } 
    if(response.status==200) {
        if(count>10){
            count = maxCount;
        }
        Receipe.find().skip(offset).limit(count).exec((err, receipes)=>_responseAllReceipe(response, res, err, receipes));
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseAddOneReceipe = function(res, err, result){
    let response = {}
    if(err){
        response.status = 500;
        response.message = err;
    } else{
        response.status = 200;
        response.message = result;
    }
    res.status(response.status).json(response.message);
}
const addOne = function(req, res){
    const newReceipe = {
        name : req.body.name,
        country : req.body.country,
        ingredients : []
    };
    Receipe.create(newReceipe, (err, result) => _responseAddOneReceipe(res, err, result));
}

const _responseGetOneReceipe = function(res, err, receipe){
    let response ={}
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID ;
    }else{
        response.status = 200;
        response.message = receipe;
    }
    res.status(response.status).json(response.message);
}
const getOne = function(req, res){
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findById(receipeId).exec((err, result) => _responseGetOneReceipe(res, err, result));
    } else{
        res.status(400).json({error_message:process.env.MSG_RES_INVALID_ID});
    }
}
const _responseDeleteOneReceipe = function(res, err, receipe){
    let response ={}
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID ;
    }else{
        response.status = 200;
        response.message = process.env.MSG_RES_DELETE_REC ;
    }
    res.status(response.status).json(response.message);
}
const deleteOne = function(req, res){
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findByIdAndDelete(receipeId).exec((err, result) => _responseDeleteOneReceipe(res, err, result));
    } else{
        res.status(400).json({error_message:process.env.MSG_RES_INVALID_ID});
    }
}

module.exports = {
    getAll, addOne, getOne, deleteOne
}