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
const _responseUpdateOneGet = function(err, receipe, res, response, req, udpateReceipe){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID;
    }
    if(response.status==200){
        udpateReceipe(receipe, req)
            .save((err, receipe)=>_responseUpdateOne(err, receipe, response, res));
    } else{
        res.status(response.status).json(response.message);
    }
}
const _update = function(req, res, udpateReceipe){
    const response = _getDefResponse();
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findById(receipeId).exec(
            (err, receipe)=>_responseUpdateOneGet(err, receipe, res, response, req, udpateReceipe));
    } else{
        res.status(400).json(process.env.MSG_RES_INVALID_ID_REC);
    }
}
const _fullUpdateReceipe = function(receipe, req){
    receipe.name = req.body.name;
    receipe.country = req.body.country;
    receipe.ingredients = [req.body.ingredients]||[];
    return receipe;
}
const _partialUpdateReceipe = function(receipe, req){
    receipe.name = req.body.name || receipe.name ;
    receipe.country = req.body.country || receipe.country;
    receipe.ingredients = [req.body.ingredients] || receipe.ingredients;
    return receipe;
}
const fullUpdateOne= function(req, res){
    _update(req,res,_fullUpdateReceipe);
}
const partialUpdateOne= function(req, res){
    _update(req,res, _partialUpdateReceipe);
}
function _getDefResponse(){
    return require("../../common/myvalidation").getDefaultResponse();
}
module.exports = {
    getAll, addOne, getOne, deleteOne, fullUpdateOne, partialUpdateOne
}