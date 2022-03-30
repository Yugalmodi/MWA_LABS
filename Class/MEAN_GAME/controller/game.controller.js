const gameData = require("../data/games.json");

module.exports.getAll = function(req, res){
    let offset = 0;
    let count = 5;
    let slicedData = gameData.slice(offset, offset+count)
    res.status(200).json(slicedData);
}