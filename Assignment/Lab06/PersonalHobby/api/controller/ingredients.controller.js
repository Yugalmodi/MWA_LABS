const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME);

const _idValidation = function(req, response){
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
    return response;
}

const _errValidations = function(isIngIdCheck, err, receipe, req, response){
    if(err){
        response.status = 500;
        response.message = err;
    } else if(!receipe){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_REC;
    } else if (isIngIdCheck && !receipe.ingredients.id(req.params.ingredientId)){
        response.status = 404;
        response.message = process.env.MSG_RES_404_ID_ING;
    }
    return response;
}

const _responseGetAll = function(res, err, receipe, req, response){
    response = _errValidations(false , err, receipe, req, response);
    if(response.status==200){
        response.message = receipe.ingredients;
    }
    res.status(response.status).json(response.message);
}
const getAll = function(req, res){
    let response = _idValidation(req, _getDefResponse());
    response = require("../../common/myvalidation").offsetValidation(response, req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetAll(res, err, receipe, req, response)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseAddIngridient = function(err, addedIngredient, res, req, response){
    response = _errValidations(false , err, addedIngredient, req, response);
    if(response.status==200){
        response.message = addedIngredient;
    }
    res.status(response.status).json(response.message);
}
const _getPrepareReceipe = function(req, receipe, response){
    const ingredientId = req.params.ingredientId;
    switch(response.functionName){
        case process.env.FUN_UPDATE_FULL:
            receipe.ingredients.id(ingredientId).name = req.body.name;
            receipe.ingredients.id(ingredientId).color = req.body.color;
            break;
        case process.env.FUN_UPDATE_PART:
            if(req.body && req.body.name){receipe.ingredients.id(ingredientId).name = req.body.name;}
            if(req.body && req.body.color){receipe.ingredients.id(ingredientId).color = req.body.color;}
            break;
        case process.env.FUN_ADD_ONE:
            let newIngredient = {
                name:req.body.name,
                color:req.body.color
            }
            receipe.ingredients.push(newIngredient);
            break;
    }
    return receipe;
}
const _responseAddOneGet = function(req, res, err, receipe, respone){
    response = _errValidations( false , err, receipe, req, respone);
    if(response.status==200){
        _getPrepareReceipe(req,receipe, response).save(
            (err, addedIngredient)=>_responseAddIngridient(err, addedIngredient, res, req, response));
    } else{
        res.status(response.status).json(response.message);
    }
}
const _handleAdd = function(req, res, option){
    let response = _idValidation(req, _getDefResponse());
    if(response.status==200){
        response.functionName = option;
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe)=>_responseAddOneGet(req, res, err, receipe, response));
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseGetOne = function(err, receipe, req, res, response){
    response = _errValidations(true , err, receipe, req, response);
    if(response.status==200){
        response.message = receipe.ingredients.id(req.params.ingredientId);
    }
    res.status(response.status).json(response.message);
}
const getOne = function(req, res){
    let response = _idValidation(req, _getDefResponse());
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetOne(err, receipe, req, res, response)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseDeleteIngridient = function(err, result, res, req, response){
    response = _errValidations(false , err, result, req, response);
    if(response.status==200){
        response.message = result;
    }
    res.status(response.status).json(response.message);
}
const _responseDeleteOneGet = function(err, receipe, req, res, response){
    response = _errValidations(true , err, receipe, req, response);
    if(response.status==200){
        receipe.ingredients.id(req.params.ingredientId).remove();
        receipe.save((err, result)=>_responseDeleteIngridient(err, result, res, req, response));
    }
    else{
        res.status(response.status).json(response.message);
    }
}
const deleteOne = function(req, res){
    let response = _idValidation(req, _getDefResponse());
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseDeleteOneGet(err, receipe, req, res, response)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}
const addOne = function(req, res){
    _handleAdd(req,res,process.env.FUN_ADD_ONE);
}
const fullUpdateOne= function(req, res){
    _handleAdd(req,res,process.env.FUN_UPDATE_FULL);
}
const partialUpdateOne= function(req, res){
    _handleAdd(req,res,process.env.FUN_UPDATE_PART);
}

function _getDefResponse(){
    return require("../../common/myvalidation").getDefaultResponse();
}
module.exports = {
    getAll, getOne, deleteOne, addOne, fullUpdateOne, partialUpdateOne
}