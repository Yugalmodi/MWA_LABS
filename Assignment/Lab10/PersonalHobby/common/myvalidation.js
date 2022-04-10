
function getDefaultResponse(){
    return {
        status:200,
        message:process.env.MSG_RES_DEFAULT
    }
}

const offsetValidation = function(response, req){
    let offset = parseInt(process.env.OFSSET);
    let count = parseInt(process.env.COUNT) ;
    let maxCount = parseInt(process.env.MAX_COUNT) ;
    let lat=0.0; let lng =0.0; let distance = process.env.DEFAULT_DISTANCE;
    let name=null; let country = null;
    if(response.status==200 && req.query){
        if(req.query.offset){
            offset = parseInt(req.query.offset);
        }
        if(req.query.count){
            count = parseInt(req.query.count);
        }
        if(req.query.lat && req.query.lng){
            lat = parseFloat(req.query.lat);
            lng = parseFloat(req.query.lng);
        }
        if(req.query.distance){
            distance = parseInt(req.query.distance, 10);
        }
        if(req.query.name){
            name = req.query.name ||null;
        }
        if(req.query.country){
            country = req.query.country || null;
        }

        if(isNaN(offset) || isNaN(count)){
            response.status = 400;
            response.message = process.env.MSG_RES_NaN;
        } else{
            count = Math.abs(count);
            offset = Math.abs(offset);
            if(count>maxCount){
                count = maxCount;
            }
        }
        if(response.status==200 && (isNaN(lat) || isNaN(lng))){
            response.status = 400;
            response.message = process.env.MSG_RES_LAT_LNG;
        }
        if(response.status==200 && lat!=0.0 && isNaN(distance)){
            response.status = 400;
            response.message = process.env.MSG_RES_DISTANCE;
        }
    }
    response.offset=offset;
    response.count=count;
    response.lat=lat;
    response.lng=lng;
    response.distance=distance;
    response.name=name;
    response.country=country;
    return response;
}

module.exports = {
    offsetValidation, getDefaultResponse
}