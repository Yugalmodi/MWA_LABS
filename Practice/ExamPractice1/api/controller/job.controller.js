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
    console.log(req.body);
    let location ={}
    if(req.body.address){
        location.address = req.body.address;
        location.city = req.body.city;
        location.state = req.body.state;
        location.zip = req.body.zip;
        location.country = req.body.country;
    }
    let skills = []
    if(req.body.skills){
        skills = req.body.skills.split(",");
    }
    console.log(skills, location);
    const newJob = {
        title:req.body.title,
        salary:req.body.salary,
        description:req.body.description,
        experience:req.body.experience,
        postDate:req.body.postDate,
        location:location,
        skills:skills
    }
    JOBS.create(newJob, (err, result)=>_handleAddOneRes(err, result, res, myContainer));
}

const _handleGetAllRes = function (err, result, res, myContainer){
    if(err){
        myContainer.status = 500;
        myContainer.message = err;
        // console.log(err);
    } else{
        myContainer.status = 200;
        myContainer.message = result;
    }
    _terminate(res, myContainer.status, myContainer.message);
}

const getAllJobs = function(req, res){
    const myContainer = _getDefaultResponse();
    let offset = 0;
    let count = 3; 
    let duration = parseInt(req.query.duration) || 0;
    let query=null;
    if(isNaN(duration) || duration>6){
        myContainer.status = 400;
        myContainer.message = process.env.RES_DURATION;
    } 
    if(myContainer.status==200 && duration>0 && duration<=6){
        count = 99999999999;
        let date = new Date();
        date.setMonth(date.getMonth()-duration);
        query = {postDate:{
            $gte: date //gte for after assigned date, lte for before assigned date
        }}
    }
    if(myContainer.status==200){
        JOBS.find(query).skip(offset).limit(count).exec((err, result)=>_handleGetAllRes(err, result, res, myContainer));
    } else{
        _terminate(res, myContainer.status, myContainer.message);
    }
}

const getAllState = function(req, res){
    const myContainer = _getDefaultResponse();
    JOBS.find().distinct('location.state').exec((err, result)=>_handleGetAllRes(err, result, res, myContainer));
}
const _handleGetOneJob = function(err, result, res, myContainer){
    if(err){
        myContainer.status = 500;
        myContainer.message = err;
    } else if(!result){
        myContainer.status = 404;
        myContainer.message = process.env.RES_404_JOB_ID;
    } else {
        myContainer.status = 200;
        myContainer.message = result;
    }
    _terminate(res, myContainer.status, myContainer.message);
}
const getOneJob = function(req, res){
    const myContainer = _getDefaultResponse();
    const jobId = req.params.jobId;
    if(mongoose.isValidObjectId(jobId)){
        JOBS.findById(jobId).exec((err, result)=>_handleGetOneJob(err, result, res, myContainer));
    } else{
        _terminate(res, 400, process.env.RES_INVALID_JOB_ID);
    }
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
    addOneJob, getAllJobs, getAllState, getOneJob
}