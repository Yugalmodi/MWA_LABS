const mongoose = require("mongoose");
const Student = mongoose.model(process.env.MODEL_STU);

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
    Student.find().skip(offset).limit(count).exec(function(err, students){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(students);
        }
    });
}
module.exports.getOne = function(req, res){
    let studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json({error:err.message});
        } else{
            res.status(201).json(student);
        }
    });
}