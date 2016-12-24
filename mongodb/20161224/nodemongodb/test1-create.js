var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/fengDb';
var insertData = function(db,callback){
	var collection = db.collection('user1');	
	var data = [{'username':'fengnovo','age': 26},{'username':'xiaoming','age': 25}];
	collection.insert(data,function(err,result){
		if (err) {
			console.log(err);
			return;
		}
		callback(result);
	});
}

MongoClient.connect(DB_CONN_STR,function(err,db){
	if(err){
		console.log(err);
		return;
	}
	insertData(db,function(result){
		console.log(result);
		db.close();
	});
})