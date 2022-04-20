const mongoose = require("mongoose");
const USERS = mongoose.model(process.env.MODEL_NAME_USER);
const myUtils = require("../../common/myUtils");
const bcrypt = require("bcrypt");

const addOne = function (req, res){
    const response = myUtils.getDefaultResponse();
    if(req.body && req.body.username && req.body.password){
        const newUser = {
            name : req.body.name,
            username : req.body.username
        };
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
            .then((salt)=>{
                console.log("salt", salt);
                return bcrypt.hash(req.body.password, salt);
            })
            .then((hashPassword)=>{
                console.log("hashPassword", hashPassword);
                newUser.password = hashPassword;
                return USERS.create(newUser);
            })
            .then(()=>myUtils.updateMyResponse(response, "", process.env.RES_STATUS_CODE_SUCC_NO_CONTENT))
            .catch((err)=>myUtils.updateMyResponse(response, err, process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=>myUtils.terminate(res, response));
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_NEW_USER_ERR, process.env.RES_STATUS_CODE_ERR_USER)
        myUtils.terminate(res, response)
    }
}


const _checkUserIdAndUpdateResponse2 = function(response, result){
    if(result){
        myUtils.updateMyResponse(response, "Login Success", 
            process.env.RES_STATUS_CODE_SUCC);
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_LOGIN_ERR, 
            process.env.RES_STATUS_CODE_ERR_LOGIN);
    }
}
const _checkUserIdAndUpdateResponse = function(response, result, password){
    console.log("_checkUserIdAndUpdateResponse", result);
    if(result.length>0){
        return bcrypt.compare(password, result[0].password);
    } else {
        myUtils.updateMyResponse(response, process.env.MSG_RES_LOGIN_ERR, 
                process.env.RES_STATUS_CODE_ERR_LOGIN);
    }
}
const login = function (req, res){
    const response = myUtils.getDefaultResponse();
    if(req.body && req.body.username && req.body.password){
        const username = req.body.username;
        const password = req.body.password;
        USERS.find({username:username})
            .then((result)=>_checkUserIdAndUpdateResponse(response, result, password))
            .then((result)=>_checkUserIdAndUpdateResponse2(response, result, password))
            .catch((err)=>myUtils.updateMyResponse(response,err,process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=> myUtils.terminate(res, response));
    } else {
        myUtils.updateMyResponse(response, process.env.MSG_RES_NEW_USER_ERR, 
                process.env.RES_STATUS_CODE_ERR_USER);
        myUtils.terminate(res, response);
    }
}

module.exports = {
    addOne, login
}