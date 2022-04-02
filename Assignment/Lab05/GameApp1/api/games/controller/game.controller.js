const mongoose = require("mongoose");
const Game = mongoose.model(process.env.MODEL_GAME);

module.exports.getAll = function(req, res){
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset){
        offset = req.query.offset;
    }
    if (req.query && req.query.count){
        count = req.query.count;
    }
    if(count>10){
        count=10;
    }
    Game.find().skip(offset).limit(count).exec(function(err, games){
        res.status(201).json(games);
    });
}
module.exports.getOne = function(req, res){
    let gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games);
        }
    });
}
module.exports.deleteOne = function(req, res){
    let gameId ={_id : req.params.gameId};
    Game.deleteOne(gameId).exec(function(err, msg){
        if(err){
            res.status(500).json({error:err.message});  
        } else{
            res.status(201).json(msg);
        }
    });
}