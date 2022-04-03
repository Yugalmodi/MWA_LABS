const offsetValidation = function(response, req){
    let offset = parseInt(process.env.OFSSET);
    let count = parseInt(process.env.COUNT) ;
    let maxCount = parseInt(process.env.MAX_COUNT) ;
    if(response.status==200 && req.query){
        if(req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query.count){
            count = parseInt(req.query.count);
        }
        if(isNaN(offset) || isNaN(count)){
            response.status = 400;
            response.message = process.env.MSG_RES_NaN;
        }else if(count>maxCount){
            count = maxCount;
        }
    }
    response.offset = offset;
    response.count=count;
    return response;
}

module.exports = {
    offsetValidation
}