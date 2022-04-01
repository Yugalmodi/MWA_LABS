const mongoClient = require("mongodb").MongoClient;
let _connection = null;

let open = function(){
	if(get()==null){
		mongoClient.connect(process.env.DB_URL+process.env.DB_NAME, function(err, client){
			if(err){
				console.log(process.env.MSG_DB_FAIL);
				return;
			} else{
				_connection = client.db(process.env.DB_NAME);
                console.log(process.env.MSG_DB_SUCC);
			}
		});
	}
}

let get = function(){
    return _connection;
}

let gameCollection = function(){
    return get().collection(process.env.DB_COLL_GAME);
}

module.exports = {
    open, get, gameCollection
}