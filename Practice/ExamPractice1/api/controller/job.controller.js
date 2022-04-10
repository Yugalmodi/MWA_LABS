const mongoose = require("mongoose");
const JOBS = mongoose.model(process.env.MODEL_NAME);

const _handleAddOneRes =function(err, result, res, myContainer){
    if(err){
        myContainer.status = 500;
        myContainer.message = err;
    } else {
        myContainer.status = 200;
        myContainer.message = result;
    }
    _terminate(res, myContainer.status, myContainer.message);
}
const addOneJob = function(req, res){
    const myContainer = _getDefaultResponse();
    const newJob = {
        title:req.body.title,
        salary:req.body.salary,
        description:req.body.description,
        experience:req.body.experience,
        postDate:req.body.postDate,
        location:{},
        skills:[]
    }
    JOBS.create(newJob, (err, result)=>_handleAddOneRes(err, result, res, myContainer));
}

const _handleGetAllRes = function (err, result, res, myContainer){
    if(err){
        myContainer.status = 500;
        myContainer.message = err;
    } else{
        myContainer.status = 200;
        myContainer.message = result;
    }
    _terminate(res, myContainer.status, myContainer.message);
}

const getAllJobs = function(req, res){
    const myContainer = _getDefaultResponse();
    const offset = 0;
    const count = 5;
    JOBS.find().skip(offset).limit(count).exec((err, result)=>_handleGetAllRes(err, result, res, myContainer));
}

function _terminate(res, status, msg){
    res.status(status).json(msg);
}
function _getDefaultResponse(){
    return { 
        status:200, message:process.env.DEFAULT_RES
    }
}
module.exports = {
    addOneJob, getAllJobs
}