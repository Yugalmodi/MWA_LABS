const mongoose = require("mongoose");
const Game = mongoose.model(process.env.MODEL_GAME);

module.exports.getAll = function(req, res){
    let offset = 0;
    let count = 10;
    let gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").skip(offset).limit(count).exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games.reviews);
        }
    });
}
module.exports.getOne = function(req, res){
    let gameId = req.params.gameId;
    let reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games.reviews.id(reviewId));
        }
    });
}