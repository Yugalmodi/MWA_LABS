const mongoose = require("mongoose");
const Student = mongoose.model(process.env.MODEL_STU);

module.exports.getAll = function(req, res){
    let offset = 0;
    let count = 10;
    let studentId = req.params.studentId;
    Student.findById(studentId).select("courses").skip(offset).limit(count).exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games.courses);
        }
    });
}
module.exports.getOne = function(req, res){
    let studentId = req.params.studentId;
    let courseId = req.params.courseId;
    Student.findById(studentId).select("courses").exec(function(err, games){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(games.courses.id(courseId));
        }
    });
}