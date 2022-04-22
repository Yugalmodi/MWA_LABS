const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME_RECEIPE);
const myUtils = require("../../common/myUtils");

const getAllValidation = function(response, req){
    let defaultStatusCode = parseInt(process.env.RES_STATUS_CODE_SUCC);

    //For Pagination
    let offset = parseInt(process.env.OFSSET);
    let count = parseInt(process.env.COUNT) ;
    let maxCount = parseInt(process.env.MAX_COUNT) ;
    
    //For Serach by lat lang
    let lat = parseFloat(process.env.DEFAULT_LAT); 
    let lng = parseFloat(process.env.DEFAULT_LAT);
    let distance = parseInt(process.env.DEFAULT_DISTANCE);
    
    //For Serach by name
    let name=null; 
    let country = null;
    
    if(response.status==defaultStatusCode && req.query){
        if(req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query.count){
            count = parseInt(req.query.count);
        }
        if(req.query.lat && req.query.lng){
            lat = parseFloat(req.query.lat);
            lng = parseFloat(req.query.lng);
        }
        if(req.query.distance){
            distance = parseInt(req.query.distance, 10);
        }
        if(req.query.name){
            name = req.query.name;
        }
        if(req.query.country){
            country = req.query.country;
        }

        if(isNaN(offset) || isNaN(count)){
            response.status = parseInt(process.env.RES_STATUS_CODE_ERR_USER);
            response.message = process.env.MSG_RES_NaN;
        } else{
            count = Math.abs(count);
            offset = Math.abs(offset);
            if(count>maxCount){
                count = maxCount;
            }
        }
        if(response.status==defaultStatusCode && (isNaN(lat) || isNaN(lng))){
            response.status = parseInt(process.env.RES_STATUS_CODE_ERR_USER);
            response.message = process.env.MSG_RES_LAT_LNG;
        }
        if(response.status==defaultStatusCode && lat!=0.0 && isNaN(distance)){
            response.status = parseInt(process.env.RES_STATUS_CODE_ERR_USER);
            response.message = process.env.MSG_RES_DISTANCE;
        }
    }
    response.offset=offset;
    response.count=count;
    response.lat=lat;
    response.lng=lng;
    response.distance=distance;
    response.name=name;
    response.country=country;
    return response;
}
const  _getQuery = function(response){
    let query = null;
    if(response.lat!=process.env.DEFAULT_LAT){
        const point = {
            type:"Point",
            coordinates:[response.lng, response.lat]
        }
        query = {
            "publisher.location.coordinates":{
                $near:{
                    $geometry:point,
                    $minDistance:0,
                    $maxDistance:response.distance
                }
            }
        }
    } else if(response.name!=null){
        query={name:{$regex: response.name.toLowerCase()}}
    } else if(response.country!=null){
        query={country:{$regex: response.country.toLowerCase()}}
    }
    return query;
}
const getAll = function(req, res){
    let response = myUtils.getDefaultResponse();
    response = getAllValidation(response, req);
    if(response.status==process.env.RES_STATUS_CODE_SUCC) {
        Receipe.find(_getQuery(response))
            .skip(response.offset)
            .limit(response.count)
            .then((receipes)=>myUtils.updateMyResponse(response, receipes, process.env.RES_STATUS_CODE_SUCC))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_MACHINE))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.terminate(res, response);
    }
}

const addOne = function(req, res){
    const response = myUtils.getDefaultResponse();
    const newReceipe = {
        name : req.body.name.toLowerCase(),
        country : req.body.country.toLowerCase(),
        ingredients : []
    };
    Receipe.create(newReceipe) 
        .then(()=>myUtils.updateMyResponse(response, "", process.env.RES_STATUS_CODE_SUCC_NO_CONTENT))
        .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
        .finally(()=>myUtils.terminate(res, response));
}

const _checkIdNullAndUpdateResponseGet = function(response, result){
    if(result){
        myUtils.updateMyResponse(response, result, process.env.RES_STATUS_CODE_SUCC)
    } else {
        myUtils.updateMyResponse(response, process.env.MSG_RES_404_ID_REC, process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND)
    }
}
const getOne = function(req, res){
    const response = myUtils.getDefaultResponse();
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findById(receipeId)
            .then((result)=>_checkIdNullAndUpdateResponseGet(response, result))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=> myUtils.terminate(res, response));
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_INVALID_ID, process.env.RES_STATUS_CODE_ERR_USER);
        myUtils.terminate(res, response);
    }
}

const _checkIdNullAndUpdateResponseDelete = function(response, result){
    if(result){
        myUtils.updateMyResponse(response, process.env.MSG_RES_DELETE_REC, process.env.RES_STATUS_CODE_SUCC_NO_CONTENT);
    } else {
        myUtils.updateMyResponse(response, process.env.MSG_RES_404_ID_REC, process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND)
    }
}
const deleteOne = function(req, res){
    const response = myUtils.getDefaultResponse();
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findByIdAndDelete(receipeId)
            .then((result)=>_checkIdNullAndUpdateResponseDelete(response, result))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=> myUtils.terminate(res, response));
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_INVALID_ID, process.env.RES_STATUS_CODE_ERR_USER);
        myUtils.terminate(res, response);
    }
}

const _checkIdNullAndUpdateResponseUpdate2 = function(response){
    if(response.status==process.env.RES_STATUS_CODE_SUCC){
        myUtils.updateMyResponse(response, "Updated", process.env.RES_STATUS_CODE_SUCC_NO_CONTENT)
    }
}
const _checkIdNullAndUpdateResponseUpdate = function(response, result, udpateReceipeFun, req){
    if(result){
        return udpateReceipeFun(result, req).save();
    } else {
        myUtils.updateMyResponse(response, process.env.MSG_RES_404_ID_REC, process.env.RES_STATUS_CODE_ERR_ID_NOT_FOUND)
    }
}
const _update = function(req, res, udpateReceipeFun){
    const response = myUtils.getDefaultResponse();
    const receipeId = req.params.receipeId;
    if(mongoose.isValidObjectId(receipeId)){
        Receipe.findById(receipeId)
            .then((result)=>_checkIdNullAndUpdateResponseUpdate(response, result, udpateReceipeFun, req))
            .then(()=>_checkIdNullAndUpdateResponseUpdate2(response))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=> myUtils.terminate(res, response));
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_INVALID_ID_REC, process.env.RES_STATUS_CODE_ERR_USER);
        myUtils.terminate(res, response);
    }
}

const _fullUpdateReceipe = function(receipe, req){
    receipe.name = req.body.name.toLowerCase();
    receipe.country = req.body.country.toLowerCase();
    return receipe;
}
const _partialUpdateReceipe = function(receipe, req){
    receipe.name = req.body.name.toLowerCase() || receipe.name ;
    receipe.country = req.body.country.toLowerCase() || receipe.country;
    return receipe;
}
const fullUpdateOne= function(req, res){
    _update(req,res,_fullUpdateReceipe);
}
const partialUpdateOne= function(req, res){
    _update(req,res, _partialUpdateReceipe);
}

module.exports = {
    getAll, addOne, getOne, deleteOne, fullUpdateOne, partialUpdateOne
}