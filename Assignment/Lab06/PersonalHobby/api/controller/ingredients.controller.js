const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME);

const _idValidation = function(req){
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
    return response;
}

const _errValidations = function(isIngIdCheck, err, receipe, req, response){
    if(response==null){
        response ={
            status:200,
            message : process.env.MSG_RES_DEFAULT
        }
    }
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

const _responseGetAll = function(res, err, receipe){
    let response = _errValidations(false , err, receipe, null);
    if(response.status==200){
        response.message = receipe.ingredients;
    }
    res.status(response.status).json(response.message);
}
const getAll = function(req, res){
    let response = _idValidation(req);
    response = require("../../common/myvalidation").offsetValidation(response, req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetAll(res, err, receipe)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseAddIngridient = function(err, addedIngredient, res){
    let response = _errValidations(false , err, addedIngredient, null);
    if(response.status==200){
        response.message = addedIngredient;
    }
    res.status(response.status).json(response.message);
}
const _getPrepareReceipe = function(req, receipe, response){
    switch(response.functionName){
        case process.env.FUN_UPDATE_FULL:
            let receipId = receipe.ingredients.id(req.params.ingredientId);
            receipId.name = res.params.name;
            receipId.color = res.params.color;
            break;
        case process.env.FUN_UPDATE_PART:
            let receipId1 = receipe.ingredients.id(req.params.ingredientId);
            if(req.body.name){receipId1.name = res.params.name;}
            if(req.body.color){receipId1.color = res.params.color;}
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
const _responseAddOneGet = function(req, res, err, receipe){
    let response = _errValidations( false , err, receipe, req);
    if(response.status==200){
        _getPrepareReceipe(req,receipe,response).save(
            (err, addedIngredient)=>_responseAddIngridient(err, addedIngredient, res));
    } else{
        res.status(response.status).json(response.message);
    }
}
const addOne = function(req, res, option){
    let response = _idValidation(req);
    if(response.status==200){
        if(option!=null){
            response.functionName = option;
        } else{
            response.functionName = process.env.FUN_ADD_ONE;
        }
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe)=>_responseAddOneGet(req, res, err, receipe));
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseGetOne = function(err, receipe, req, res){
    let response = _errValidations(true , err, receipe, req);
    if(response.status==200){
        response.message = receipe.ingredients.id(req.params.ingredientId);
    }
    res.status(response.status).json(response.message);
}
const getOne = function(req, res){
    let response = _idValidation(req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseGetOne(err, receipe, req, res)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}

const _responseDeleteIngridient = function(err, result, res){
   let response = _errValidations(false , err, result, null);
    if(response.status==200){
        response.message = result;
    }
    res.status(response.status).json(response.message);
}
const _responseDeleteOneGet = function(err, receipe, req, res){
    let response = _errValidations(true , err, receipe, req);
    if(response.status==200){
        receipe.ingredients.id(req.params.ingredientId).remove();
        receipe.save((err, result)=>_responseDeleteIngridient(err, result, res));
    }
    else{
        res.status(response.status).json(response.message);
    }
}
const deleteOne = function(req, res){
    let response = _idValidation(req);
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS).exec(
            (err, receipe) => _responseDeleteOneGet(err, receipe, req, res)
        );
    } else{
        res.status(response.status).json(response.message);
    }
}


const fullUpdateOne= function(req, res){
    addOne(req,res,functionName,process.env.FUN_UPDATE_FULL );
}
const partialUpdateOne= function(req, res){
    addOne(req,res,process.env.FUN_UPDATE_PART);
}
module.exports = {
    getAll, addOne, getOne, deleteOne, fullUpdateOne, partialUpdateOne
}