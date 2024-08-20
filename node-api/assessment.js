//Assessment NodeAPI and React

//1. Create a setup for Express Web Server
//2. Configure a route name - Student
//3. Create a express app and configure in server.js to delegate routes with - "Student"
//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string
//5. Save this information received in #4  to a file named studentIfo using fs module async way
//6. Create a setup for webpack
//7. What is the purpose of babel, are most important configurations we get from webpack
//8. What is the purpose of -ReactDOM.createRoot

//1. Create a setup for Express Web Server

const express = require('express');//importing express package

const app = express();//using express function we create the request for app

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.listen(3000, () => {
    console.log("API is running at http://localhost:3000")
}
);

//2. Configure a route name - Student






