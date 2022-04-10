const mongoose = require("mongoose");
const Game = mongoose.model(process.env.MODEL_NAME);

const _handleGetAll = function(err, result, res, myContainer){
    if(err){
        myContainer.status= 500;
        myContainer.message = err;
    } else{
        myContainer.status= 200;
        myContainer.message = result;
    }
    _terminate(myContainer, res);
}
const 
_getQuery = function(req, lat, lng, distance){
    let query = null;
    if(lat!=0.0){
        const point = {
            type:"Point",
            coordinates:[lng, lat]
        }
        query = {
            "publisher.location.coordinates":{
                $near:{
                    $geometry:point,
                    $minDistance:0,
                    $maxDistance:distance
                }
            }
        }
    }
    return query;
}
const getAllGames = function(req, res){
    const myContainer = _getContainer();
    let offset=0;
    let count = 5;
    const maxCount = 10;
    let lat=0.0; let lng =0.0; let distance = 0;
    if(req.query){
        if(req.query.offset){
            offset = parseInt(req.query.offset, 10) || offset;
        }
        if(req.query.count){
            count = parseInt(req.query.count, 10);
        }
        if(req.query.lat && req.query.lng){
            lat = parseFloat(req.query.lat);
            lng = parseFloat(req.query.lng);
        }
        if(req.query.distance){
            distance = parseInt(req.query.distance, 10) || process.env.DEFAULT_DISTANCE;
        }
    }
    if(isNaN(offset) || isNaN(count)){
        myContainer.status = 400;
        myContainer.message = process.env.MSG_RES_OFFSET;
    }
    if(myContainer.status==200 && (isNaN(lat) || isNaN(lng))){
        myContainer.status = 400;
        myContainer.message = process.env.MSG_RES_LAT_LNG;
    }
    if(myContainer.status==200 && lat!=0.0 && isNaN(distance)){
        myContainer.status = 400;
        myContainer.message = process.env.MSG_RES_DISTANCE;
    }
    if(myContainer.status==200){
        count = Math.abs(count);
        if(count>maxCount) count=maxCount;
        Game.find(_getQuery(req, lat, lng, distance)).skip(offset).limit(count).exec((err, result)=>_handleGetAll(err, result, res, myContainer));
    } else{
        _terminate(myContainer, res);
    }
}

const _handleAddOne= function(err, result, res, myContainer){
     if(err){
        myContainer.status= 500;
        myContainer.message = err;
    } else{
        myContainer.status= 200;
        myContainer.message = result;
    }
    _terminate(myContainer, res);
}
const addOne = function(req, res){
    const myContainer = _getContainer();
    const newGame = {
        title:req.body.title,
        year:req.body.year,
        rate:req.body.rate,
        price:req.body.price,
        minPlayer:req.body.minPlayer,
        maxPlayer:req.body.maxPlayer,
        publisher:{},
        reviews:[],
        minAge:req.body.minAge,
        desginers:[]
    }
    Game.create(newGame, (err, result)=>_handleAddOne(err, result, res, myContainer));
}

const _handlegeOne = function(err, result, myContainer){
    if(err){
                res.status(500).json({error:err.message});
            } else{
                res.status(201).json(games);
            }
}
const getOne = function(req, res){
    const myContainer = _getContainer();
    let gameId = req.params.gameId;
    if(mongoose.isValidObjectId(gameId)){
        Game.findById(gameId).exec(function(err, games){
            
        });
    } else{
        myContainer.status = 400;
        myContainer.message = process.env.MSG_RES_INV_GAME_ID;
        _terminate(myContainer, res);
    }
}

const deleteOne = function(req, res){
    let gameId ={_id : req.params.gameId};
    Game.deleteOne(gameId).exec(function(err, msg){
        if(err){
            res.status(500).json({error:err.message});  
        } else{
            res.status(201).json(msg);
        }
    });
}

function _terminate(myContainer, res){
    res.status(myContainer.status).json(myContainer.message);
}
function _getContainer(){
    return {
        status:200,
        message:process.env.MSG_RES_DEFAULT
    }
}
module.exports = {
    getAllGames, addOne, getOne, deleteOne
}