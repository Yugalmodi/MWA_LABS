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
    response = require("../../common/myvalidation").offsetValidation(response, req);
    console.log(response.offset, response.count);
    if(response.status==200) {
        Receipe.find().skip(response.offset).limit(response.count).exec((err, receipes)=>_responseAllReceipe(response, res, err, receipes));
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
    console.log(response.message);
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

const _responseUpdateOne = function(err, receipe, response, res){
    if(err){
        response.status = 500;
        response.message = err;
    } else {
        response.status = 200;
        response.message = receipe;
    }
    res.status(response.status).json(response.message);
}
const _getUpdatedReceipe = function(receipe, response, req){
    if(response.functionName == process.env.FUN_UPDATE_FULL){
        receipe.name = req.body.name;
        receipe.country = req.body.country;
        receipe.ingredients = [];
    } else{
        if (req.body && req.body.name){
            receipe.name = req.body.name
        }
        if (req.body && req.body.country){
            receipe.country = req.body.country
        }
    }
    return receipe;
}
const _responseUpdateOneGet = function(err, receipe, res, response, req){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID;
    }
    if(response.status==200){
        _getUpdatedReceipe(receipe, response, req)
            .save((err, receipe)=>_responseUpdateOne(err, receipe, response, res));
    } else{
        res.status(response.status).json(response.message);
    }
}
const _update = function(req, res, response){
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findById(receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe)=>_responseUpdateOneGet(err, receipe, res, response, req));
    } else{
        res.status(400).json(process.env.MSG_RES_INVALID_ID_REC);
    }
}
const fullUpdateOne= function(req, res){
    const response = _getDefResponse();
    response.functionName=process.env.FUN_UPDATE_FULL 
    _update(req,res, response);
}
const partialUpdateOne= function(req, res){
    const response = _getDefResponse();
    response.functionName=process.env.FUN_UPDATE_PART 
    _update(req,res, response);
}
function _getDefResponse(){
    return require("../../common/myvalidation").getDefaultResponse();
}
module.exports = {
    getAll, addOne, getOne, deleteOne, fullUpdateOne, partialUpdateOne
}