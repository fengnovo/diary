var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/fengDb';
var insertData = function(db,callback){
	var collection = db.collection('user1');	
	var whereStr = {'username': 'fengnovo'};
	collection.remove(whereStr,function(err,result){
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

/*
> db.user1.find()
{ "_id" : ObjectId("585e962afb58e4036deb761e"), "username" : "fengnovo", "age" : 26 }
{ "_id" : ObjectId("585e962afb58e4036deb761f"), "age" : 24 }
> db.user1.find()
{ "_id" : ObjectId("585e962afb58e4036deb761f"), "age" : 24 }
*/
