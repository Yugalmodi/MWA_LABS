const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME_RECEIPE);
const myUtils = require("../../common/myUtils");

const _idValidation = function(req, response){
    const receipeId = req.params.receipeId;
    const ingredientId = req.params.ingredientId;
    response.receipeId = receipeId;
    response.ingredientId = ingredientId;
    if(!mongoose.isValidObjectId(receipeId)){
        response.status = process.env.RES_STATUS_CODE_ERR_USER;
        response.message = process.env.MSG_RES_INVALID_ID_REC;
    } 
    if(ingredientId!=null && !mongoose.isValidObjectId(req.params.ingredientId)){
        response.status = process.env.RES_STATUS_CODE_ERR_USER;
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

const _checkIdNullAndUpdateResponseGetAll = function(response, receipe){
    if(receipe){
        myUtils.updateMyResponse(response, 
            receipe.ingredients, 
            process.env.RES_STATUS_CODE_SUCC
        );
    } else {
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_REC, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    }
}
const getAll = function(req, res){
    let response = _idValidation(req, myUtils.getDefaultResponse());
    if(response.status==process.env.RES_STATUS_CODE_SUCC){
        Receipe.findById(response.receipeId).select("ingredients")
            .then((result)=>_checkIdNullAndUpdateResponseGetAll(response, result))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.terminate(res, response);
    }
}

const _checkIdNullAndUpdateResponseGetOne = function(response, receipe, req){
    const ingId = req.params.ingredientId;
    if(!receipe){
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_REC, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else if (!receipe.ingredients.id(ingId)) {
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_ING, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else{
        myUtils.updateMyResponse(response, 
            receipe.ingredients.id(ingId), 
            process.env.RES_STATUS_CODE_SUCC
        );
    }
}
const getOne = function(req, res){
    let response = _idValidation(req, myUtils.getDefaultResponse());
    if(response.status==200){
        // Receipe.findById(response.receipeId).select("ingredients").exec(
        //     (err, receipe) => _responseGetOne(err, receipe, req, res, response));
        Receipe.findById(response.receipeId).select("ingredients")
            .then((result)=>_checkIdNullAndUpdateResponseGetOne(response, result, req))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.terminate(res, response);
    }
}

const _checkIdNullAndUpdateResponseDeleteOne2 = function(response){
    if(response.status==process.env.RES_STATUS_CODE_SUCC){
        myUtils.updateMyResponse(response, "Deleted", process.env.RES_STATUS_CODE_SUCC_NO_CONTENT)
    }
}
const _checkIdNullAndUpdateResponseDeleteOne = function(response, receipe, req){
    const ingId = req.params.ingredientId;
    if(!receipe){
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_REC, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else if (!receipe.ingredients.id(ingId)) {
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_ING, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else{
        receipe.ingredients.id(ingId).remove();
        return receipe.save();
    }
}
const deleteOne = function(req, res){
    let response = _idValidation(req, myUtils.getDefaultResponse());
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS)
            .then((result)=>_checkIdNullAndUpdateResponseDeleteOne(response, result, req))
            .then((result)=>_checkIdNullAndUpdateResponseDeleteOne2(response))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.terminate(res, response);
    }
}

const _checkIdNullAndUpdateResponseAddOne2 = function(response){
    if(response.status==process.env.RES_STATUS_CODE_SUCC){
        myUtils.updateMyResponse(response, "done", process.env.RES_STATUS_CODE_SUCC_NO_CONTENT)
    }
}
const _checkIdNullAndUpdateResponseAddOne = function(response, receipe, req, _requiredReceipeFun){
    const ingId = req.params.ingredientId;
    if(!receipe){
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_REC, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else if (ingId && !receipe.ingredients.id(ingId)) {
        myUtils.updateMyResponse(response, 
            process.env.MSG_RES_404_ID_ING, 
            process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND
        );
    } else{
        return _requiredReceipeFun(receipe, req).save();
    }
}
const _handleAdd = function(req, res, _requiredReceipeFun){
    let response = _idValidation(req, myUtils.getDefaultResponse());
    if(response.status==200){
        Receipe.findById(response.receipeId).select(process.env.INGREDIENTS)
            .then((result)=>_checkIdNullAndUpdateResponseAddOne(response, result, req, _requiredReceipeFun))
            .then(()=>_checkIdNullAndUpdateResponseAddOne2(response))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.terminate(res, response);
    }
}

const _addReceipe = function(receipe, req){    
    let newIngredient = {
        name:req.body.name.toLowerCase(),
        color:req.body.color.toLowerCase()
    }
    receipe.ingredients.push(newIngredient);
    return receipe;    
}
const _partialUpdateReceipe = function(receipe, req){
    const id = receipe.ingredients.id(req.params.ingredientId);
    id.name = req.body.name.toLowerCase() ||  id.name;
    id.color = req.body.color.toLowerCase() ||  id.color;
    return receipe;    
}
const _fullUpdateReceipe = function(receipe, req){
    const ingredientId = receipe.ingredients.id(req.params.ingredientId);
    ingredientId.name = req.body.name.toLowerCase(); 
    ingredientId.color = req.body.color.toLowerCase();
    return receipe;    
}
const addOne = function(req, res){
    _handleAdd(req,res, _addReceipe);
}
const fullUpdateOne= function(req, res){
    _handleAdd(req,res, _fullUpdateReceipe);
}
const partialUpdateOne= function(req, res){
    _handleAdd(req,res, _partialUpdateReceipe);
}

module.exports = {
    getAll, getOne, deleteOne, addOne, fullUpdateOne, partialUpdateOne
}