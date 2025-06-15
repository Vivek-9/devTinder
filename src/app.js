const express = require("express");

const app = express();



app.use("/home",(req,res) => { 
    res.send('This is Home page');  
})

app.use('/about',(req,res) => {
    res.send('This is about page...');
})

app.use("/",(req, res) => {
    res.send("Hello from the server!");
})

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777...");
})