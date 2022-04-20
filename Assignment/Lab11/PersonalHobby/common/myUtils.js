function updateMyResponse(response, message, statusCode){
    console.log(statusCode, message);
    response.status = parseInt(statusCode);
    response.message = message;
}
function terminate(res, response){
    res.status(response.status).json(response.message);
}

function getDefaultResponse(){
    return {
        status:parseInt(process.env.RES_STATUS_CODE_SUCC),
        message:process.env.MSG_RES_DEFAULT
    }
}

module.exports = {
    getDefaultResponse, terminate, updateMyResponse
}