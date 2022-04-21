const mongoose = require("mongoose");
const USERS = mongoose.model(process.env.MODEL_NAME_USER);
const myUtils = require("../../common/myUtils");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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

const _comparePasswordAndUpdateResponse = function(response, result, username){
    console.log("_comparePasswordAndUpdateResponse", result);
    if(result){
        const token = jwt.sign({username:username}, process.env.JWT_TOKEN_SECRET, {expiresIn:'1800s'});
        const message = {
            Success:true,
            token:token
        }
        myUtils.updateMyResponse(response, message, 
            process.env.RES_STATUS_CODE_SUCC);
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_LOGIN_ERR, 
            process.env.RES_STATUS_CODE_ERR_LOGIN);
    }
}
const _checkUserNameAndUpdateResponse = function(response, result, password){
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
            .then((result)=>_checkUserNameAndUpdateResponse(response, result, password))
            .then((isPassMatch)=>_comparePasswordAndUpdateResponse(response, isPassMatch, username))
            .catch((err)=>myUtils.updateMyResponse(response,err,process.env.RES_STATUS_CODE_ERR_SERVER))
            .finally(()=> myUtils.terminate(res, response));
    } else {
        {
            message:process.env.MSG_RES_NEW_USER_ERR
        }
        myUtils.updateMyResponse(response, process.env.MSG_RES_NEW_USER_ERR, 
                process.env.RES_STATUS_CODE_ERR_USER);
        myUtils.terminate(res, response);
    }
}

module.exports = {
    addOne, login
}