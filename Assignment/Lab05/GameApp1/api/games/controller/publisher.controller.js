const mongoose = require("mongoose");
const Game = mongoose.model(process.env.MODEL_GAME);


module.exports.getOne = function(req, res){
    let gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games.publisher);
        }
    });
}