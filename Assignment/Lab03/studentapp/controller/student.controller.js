const studentData = require("../data/studentData.json");

module.exports.getAllStudent = function(req, res){
    res.status(200).json(studentData);
}
module.exports.getOneStudent = function(req, res){
    const studentNumber = parseInt(req.params.studentNumber,10);
    if((isNaN(studentNumber) || studentNumber-1<0 || studentNumber>studentData.length)){
        res.status(200).json({'error_msg':'wrong student number, Please enter a number in between 1 to'+studentData.length});
    } else{
        res.status(200).json(studentData[studentNumber-1]);
    }

}