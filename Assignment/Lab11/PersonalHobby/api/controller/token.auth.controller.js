const myUtils = require("../../common/myUtils");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const util = require("util");

const _handleError = function(response, res){
    myUtils.updateMyResponse(response, process.env.MSG_RES_ERR_TOKEN, process.env.RES_STATUS_CODE_ERR_INV_TOKEN);
    myUtils.terminate(res, response);
}
const authenticate= function(req, res, next){
    const response = myUtils.getDefaultResponse();
    const headerExist = req.headers.authorization;
    if(headerExist){
        const token = headerExist.split(" ")[1];
        const jwtVerifyPromise = util.promisify(jwt.verify, {context:jwt});
        jwtVerifyPromise(token, process.env.JWT_TOKEN_SECRET)
            .then(()=>next())
            .catch(()=>_handleError(response, res));
    } else{
        myUtils.updateMyResponse(response, process.env.MSG_RES_NO_TOKEN, process.env.RES_STATUS_CODE_ERR_NO_TOKEN);
        myUtils.terminate(res, response);
    }
}

module.exports ={
    validateToken : authenticate
}