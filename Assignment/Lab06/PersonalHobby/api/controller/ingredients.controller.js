const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME);

const _responseGetAll = function(response, res, err, receipe){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID;
    } else {
        response.status = 200;
        response.message = receipe.ingredients;
    }
    res.status(response.status).json(response.message);
}
const getAll = function(req, res){
    let offset = process.env.OFSSET;
    let count = process.env.COUNT ;
    let response = _idValidation("getAll", req);
    if(response.status==200 && req.query){
        if(req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query.count){
            count = parseInt(req.query.count);
        }
        if(isNaN(offset) || isNaN(count)){
            response.status = 400;
            response.status = process.env.MSG_RES_NaN;
        }else if(count>process.env.MAX_COUNT){
            count = process.env.MAX_COUNT;
        }
    }
    if(response.status==200){
        Receipe.findById(response.receipeId).skip(offset).limit(count).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetAll(response, res, err, receipe)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseAddIngridient = function(err, addedIngredient, res, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else{
        response.status = 200;
        response.message = addedIngredient;
    }
    res.status(response.status).json(response.message);
}
const _responseAddOneGet = function(req, response, res, err, receipe){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID;
    } 
    if(receipe){
        let newIngredient = {
            name:req.body.name,
            color:req.body.color
        }
        receipe.ingredients.push(newIngredient)
        receipe.save((err, addedIngredient)=>_responseAddIngridient(err, addedIngredient, res, response));
    } else{
        res.status(response.status).json(response.message);
    }
}
const addOne = function(req, res){
    let response = _idValidation("addOne", req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe)=>_responseAddOneGet(req, response, res, err, receipe));
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseGetOne = function(err, receipe, req, res, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_REC;
    } else if (!receipe.ingredients.id(req.params.ingredientId)){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_ING;
    }else{
        response.status = 200;
        response.message = receipe.ingredients.id(req.params.ingredientId);
    }
    res.status(response.status).json(response.message);
}
const getOne = function(req, res){
    let response = _idValidation("getOne", req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetOne(err, receipe, req, res, response)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseDeleteIngridient = function(err, result, res, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else if (!result){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_ING;
    } else{
        response.status = 200;
        response.message = result;
    }
    res.status(response.status).json(response.message);
}
const _responseDeleteOneGet = function(err, receipe, req, res, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_REC;
    } else if (!receipe.ingredients.id(req.params.ingredientId)){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_ING;
    }

    if(response.status==200){
        receipe.ingredients.id(req.params.ingredientId).remove();
        receipe.save((err, result)=>_responseDeleteIngridient(err, result, res, response));
    }
    else{
        res.status(response.status).json(response.message);
    }
}
const deleteOne = function(req, res){
    let response = _idValidation("deleteOne", req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseDeleteOneGet(err, receipe, req, res, response)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _idValidation = function(callerName, req){
    let response ={
        status:200,
        message : process.env.MSG_RES_DEFAULT
    }
    const receipeId = req.params.receipeId;
    const ingredientId = req.params.ingredientId;
    response.receipeId = receipeId;
    response.ingredientId = ingredientId;
    if(!mongoose.isValidObjectId(receipeId)){
        response.status = 400;
        response.message = process.env.MSG_RES_INVALID_ID_REC;
    } 
    if(ingredientId!=null && !mongoose.isValidObjectId(req.params.ingredientId)){
        response.status = 400;
        response.message = process.env.MSG_RES_INVALID_ID_ING;
    }
    console.log("_idValidation, caller Name", callerName, response.status, response.message);
    return response;
}
module.exports = {
    getAll, addOne, getOne, deleteOne
}