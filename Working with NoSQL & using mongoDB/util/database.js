require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DATABASE_NAME;

let _db;

const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@project0.35tzr.mongodb.net/?retryWrites=true&w=majority&appName=${mongoDbName}`;
const mongoConnect = (callback)=>{
    MongoClient.connect(uri)
    .then(client => {
        console.log("Connected to database...")
        _db = client.db();
        callback()
        }
    )
    .catch(err => {
        console.log(err)
        throw err;
    });
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw err;
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;