
function todo(db){
    db.createCollection( "todo" , { 
        validator: { $jsonSchema: { 
        bsonType: "object", 
        required: [
            "description", 
            "subject",
            "username",
        ], 
        properties: { 
            description:{
                bsonType: "string", 
                description: "required and must be a string" }, 
            username: { 
                bsonType: "string", 
                description: "required and must be a string" }, 
        }
        }
    },   
    validationLevel: "moderate"
})
}

module.exports = {todo}