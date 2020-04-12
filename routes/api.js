const express = require ('express');
const router = express.Router();
// const Todo = require('../models/todo');
const database = require('../models/db');
const ObjectId = require('mongodb').ObjectId;


router.get('/todos/:id', (req, res, next) => {
    let db = "my-db";
    let collection = "todo";
    let db_query = {_id:ObjectId(req.params.id)};
    
    database.mongo_query(db,collection,db_query).then(function(items){
        res.json(items);
        console.info(items);
        }, function(err) {
        res.status(400).send("db error");
        console.error('The promise was rejected', err, err.stack);
    });
})

router.get('/todos', (req, res, next) => {
    let db = "my-db";
    let collection = "todo";
    let db_query = {};
    
    database.mongo_query(db,collection,db_query).then(function(items){
        res.json(items);
        console.info(items);
        }, function(err) {
        res.status(400).send("db error");
        console.error('The promise was rejected', err, err.stack);
    })

});

router.post('/todos/add', (req, res, next) => {

  if(Object.keys(req.body).length !== 0){
    let db = "my-db";
    let collection = "todo";
    let data = { description: req.body.description,
        subject: req.body.subject,
        username: req.body.username,
        priority: req.body.priority,
        time: req.body.time,
        completed: req.body.completed
    };
    // res.send(data);
    database.mongo_insert_one(db,collection,data).then(function(response){
            res.json(response);
            console.info(response);
        }, function(err) {
            res.status(400).send(err.errmsg);
            console.error('The promise was rejected', err, err.stack);
    })
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.post('/todos/update/:id', (req, res, next) => {
  
    if(Object.keys(req.body).length !== 0){
        let db = "my-db";
        let collection = "todo";
        let id = ObjectId(req.params.id);
        let data = req.body;
        // res.send(data);
        database.mongo_update_one(db,collection,data,id).then(function(response){
                res.json(response);
                console.info(response);
            }, function(err) {
                res.status(400).send(err.errmsg);
                console.error('The promise was rejected', err, err.stack);
        })
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
  });

router.delete('/todos/delete/:id', (req, res, next) => {
        let db = "my-db";
        let collection = "todo";
        let id = ObjectId(req.params.id);

        database.mongo_delete_one(db,collection,id).then(function(response){
                res.json(response);
                console.info(response);
            }, function(err) {
                res.status(400).send(err.errmsg);
                console.error('The promise was rejected', err, err.stack);
        })
})

module.exports = router;