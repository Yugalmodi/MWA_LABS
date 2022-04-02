const gameData = require("../data/games.json");
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
        let mingPlayers = parseInt(req.body.minPlayers);
        if(minAge>=6 && minAge<=99 && mingPlayers>=1 && mingPlayers<=11){
            let title = req.body.title;
            let price = parseFloat(req.body.price);
            newGame.title = title;
            newGame.price = price;
            newGame.minAge = minAge;
            newGame.mingPlayers = mingPlayers;


            let gameCollection = getGameCollection();
            gameCollection.insertOne(newGame, function(err, result){
                if(err){
                    res.status(500).json({error:err});
                }else{
                    res.status(201).json(result);
                }
            });
        } else{
            res.status(400).json({error:"Ming Age and Min Payers are not correct"});
        }
    }else{
        res.status(400).json({error:"Require Data missing from POST"});
    }
}