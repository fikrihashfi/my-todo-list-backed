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
    database.mongo_insert_one(db,collection,data).then(function(items){
            res.json(items);
            console.info(items);
        }, function(err) {
            res.status(400).send("db error");
            console.error('The promise was rejected', err, err.stack);
    })
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.post('/todos/update/:id', (req, res, next) => {
    if(req.body.action){
        Todo.findById(req.params.id,function(err, todo){
            if(!todo) res.status(404).send("Data not found!");
            else{
                todo.description =  req.body.description;
                todo.subject =  req.body.subject;
                todo.username =  req.body.username;
                todo.priority =  req.body.priority;
                todo.time =  req.body.time;
                todo.completed =  req.body.completed;

                todo.save().then(todo=>{
                    res.json('Success update todo!');
                }).catch(err=>{
                    res.status(400).send("Update failed");
                })
            }
        })
    }else {
      res.json({
        error: "The input field is empty"
      })
    }
  });

router.delete('/todos/delete/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;