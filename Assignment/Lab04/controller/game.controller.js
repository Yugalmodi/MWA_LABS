const { ObjectId } = require("mongodb");
const dbConnection = require("../data/dbConnection");

const getGameCollection = function(){
    let db = dbConnection.get();
    return db.collection(process.env.DB_COLL_NAME);
}

module.exports.getAll = function(req, res){
    let offset = 0;
    let count = 3;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(count>10){
        count=10;
    }
    let gameCollection = getGameCollection();
    gameCollection.find().skip(offset).limit(count).toArray(function(err, result){
        if(err){
            res.status(500).json({error:err});
        }else{
            res.status(201).json(result);
        }
    });
}

module.exports.addOne = function(req, res){
    let newGame = {};
    console.log(req.body, req.body.price);
    if(req.body && req.body.title && req.body.price && req.body.minAge && req.body.minPlayers){
        let minAge = parseInt(req.body.minAge);
        let minPlayers = parseInt(req.body.minPlayers);
        if(minAge>=6 && minAge<=99 && minPlayers>=1 && minPlayers<=11){
            newGame.title = req.body.title;;
            newGame.price = parseFloat(req.body.price);
            newGame.minAge = minAge;
            newGame.minPlayers = minPlayers;

            let gameCollection = getGameCollection();
            gameCollection.insertOne(newGame, function(err, result){
                if(err){
                    res.status(500).json({error:err});
                }else{
                    res.status(201).json(result);
                }
            });
        } else{
            res.status(400).json({error:process.env.MSG_ERR_MIN});
        }
    }else{
        res.status(400).json({error:process.env.MSG_ERR_DATA_MISS});
    }
}

module.exports.deleteOne = function(req, res){
    let game ={_id :ObjectId(req.params.gameId)};
    let gameCollection = getGameCollection();
    gameCollection.deleteOne(game,function(err, result){
        if(err){
            res.status(500).json({error:err});
        }else if(result.deletedCount==0){
            res.status(400).json({error:process.env.MSG_ERR_ID});
        } else {
            res.status(201).json(result);
        }
    });
}