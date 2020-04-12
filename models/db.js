var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var uri = process.env.DB_URI_Local;
const schema = require('./schema');
const db = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

function create_db_collection(){
    db.connect( err => {
      if (err) {
        db.close();
        reject(err);  
      } else {
        let dbo = db.db("my-db");
        schema.todo(dbo);
      }   
    });
}

function mongo_query(database, col, query) {
      return new Promise(function(resolve, reject) {
        db.connect( err => {
          if (err) {
            db.close();
            reject(err);  
          } else {
            let dbo = db.db(database);
            let collection = dbo.collection(col);
          
            collection.find(query).toArray(function(err, items) {
              if (err) {
                db.close();
                reject(err);
              } else {
                console.log(items);
                db.close();
                resolve(items);
              }          
            });
          }   
        });
      });
  }

function mongo_insert_one(database, col, data) {
    return new Promise(function(resolve, reject) {
      db.connect( err => {
        if (err) {
          db.close();
          reject(err);  
        } else {
          let dbo = db.db(database);
          let collection = dbo.collection(col);

          collection.insertOne(data).then((result)=> {
            console.log(err);
            db.close();
            resolve(result) 
          }).catch((err)=>
          {console.log(err);
          db.close();
          reject(err)
          });
        }   
      });
    });
}

function mongo_update_one(database, col, data, id) {
  return new Promise(function(resolve, reject) {
    db.connect(err => {
      if (err) {
        db.close();
        reject(err);  
      } else {
        let dbo = db.db(database);
        let collection = dbo.collection(col);
        let newData = data;
        console.log(newData);
        collection.updateOne(
          { "_id":id },
          { $set: newData}
        ).then((result)=> {
          console.log(err);
          db.close();
          resolve(result) 
        }).catch((err)=>
        {console.log(err);
        db.close();
        reject(err)
        });
      }   
    });
  });
}

function mongo_delete_one(database, col, id) {
  return new Promise(function(resolve, reject) {
    db.connect(err => {
      if (err) {
        db.close();
        reject(err);  
      } else {
        let dbo = db.db(database);
        let collection = dbo.collection(col);
        collection.deleteOne(
          { "_id":id }
        ).then((result)=> {
          console.log(err);
          db.close();
          resolve(result) 
        }).catch((err)=>
        {console.log(err);
        db.close();
        reject(err)
        });
      }   
    });
  });
}


module.exports = {mongo_query, mongo_insert_one, create_db_collection, mongo_update_one, mongo_delete_one}; 