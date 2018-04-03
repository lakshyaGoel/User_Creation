# User_Creation

Exercise description: 

Develop a web service with a RESTful API using either Node.js, Spring Boot, or any other web framework. The web service will be used to query user data. It should provide the following endpoints: 

* GET /users: Return a list of all users as a JSON string, e.g.: 

         { "users": [{ "username": "jsmith", "displayName": "John Smith", "department": "Sales" }, { "username": "jdoe", "displayName": "John Doe", "department": "Development" }] } 

* GET /users/{username}: Return the data of a particular user as a JSON string or status code 404 if not found 
  JSON example: { "displayName": "John Smith", "department": "Sales" } 

* POST /users/{username}: Add a new user. The request body will contain the user data as a JSON string, e.g.: 
  { "displayName": "John Smith", "department": "Sales" } 

  If the user exists, return status code 409 

* DELETE /users/{username}: Remove an existing user or return status code 404 if not exists 

* You can use a database as a backend or store the data in a file or just in memory.
