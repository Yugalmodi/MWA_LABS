const mongoose = require("mongoose");
const Receipe = mongoose.model(process.env.MODEL_NAME);

const getAll = function(req, res){
    const receipeId = req.params.receipeId;
    if(!mongoose.isValidObjectId(receipeId)){
        res.status(400).json(process.env.MSG_RES_INVALID_ID );
    } else{
        
    }
}

const addOne = function(req, res){

}

module.exports = {
    getAll, addOne
}