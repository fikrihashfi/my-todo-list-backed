
function todo(db){
    db.createCollection( "todo" , { 
        validator: { $jsonSchema: { 
        bsonType: "object", 
        required: [ 
            "subject",
            "username",
            "priority",
            "time",
            "completed"
        ], 
        properties: { 
            subject: { 
                bsonType: "string", 
                description: "required and must be a string" }, 
            username: { 
                bsonType: "string", 
                description: "required and must be a string" }, 
            priority: { 
                bsonType: "string", 
                description: "required and must be a string" }, 
            time: { 
                bsonType: "string", 
                description: "required and must be string" }, 
            completed: { 
                bsonType: "boolean", 
                description: "can be only true or false" } 
        }
        }
    }})
}

module.exports = {todo}