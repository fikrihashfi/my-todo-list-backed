var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var url = process.env.DB_URI_Local;
const schema = require('./schema');

function mongo_query(database, col, query) {
      return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
          if (err) {
            db.close();
            reject(err);  
          } else {
            var dbo = db.db(database);
            var collection = dbo.collection(col);
          
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
      MongoClient.connect(url, function(err, db) {
        if (err) {
          db.close();
          reject(err);  
        } else {
          var dbo = db.db(database);
          
          schema.todo(dbo);
          var collection = dbo.collection(col);
          collection.insertOne(data).toArray(function(err, items) {
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


module.exports = {mongo_query, mongo_insert_one}; 