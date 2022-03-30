module.exports.sum = function(req, res){
    let err_msg='';
    let num1 = parseInt(req.params.num1, 10);
    let num2 = null;
    if(req.query && req.query.num2){
        num2 = parseInt(req.query.num2, 10);
    } 
    
    if(!isNaN(num1) && num2!=null && !isNaN(num2)){
        res.status(200).json({'num1':num1, "num2":num2, "sum": num1+num2});
    }
    else{
        res.status(200).json({'error':'Please enter the correct numbers, Your link should be like http://localhost:3000/0?num2=0 format'});
    }
}