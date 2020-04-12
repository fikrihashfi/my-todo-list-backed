# my-todo-list-backed
simple todo-list-api (Work In Progress)

# Installation
Check mongodb server already running on your device. 

1. Install all dependencies : `npm install`
2. create .env on folder. and insert `DB_URI_Local=<your-db-server>` to your env.

# Todo Schema

    { 
        validator: { $jsonSchema: { 
        bsonType: "object", 
        required: [
            "description", 
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
   
# Get
<your_base_url>/api/todos (get method)

<your_base_url>/api/todos/:id (get method)

# Insert
<your_base_url>/api/todos/add (post method)

example insertion data body:

{"description":"todo api","subject":"Make todo api","username":"fikrihashfi","priority":"low","time":"2020-02-02","completed":false}

# Update
<your_base_url>/api/todos/update/:id (post method)

{"description":"todo","username":"fikrihashfi","priority":"high","time":"2020-01-01","completed":false}

# Delete
<your_base_url>/api/todos/delete/:id (delete method)






