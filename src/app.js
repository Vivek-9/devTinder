const express = require("express");

const app = express();


app.use("/home/2",(req,res) => { 
    res.send('This is Second Home page');  
})


app.use("/home",(req,res) => { 
    res.send('This is Home page');  
})

app.use('/about',(req,res) => {
    res.send('This is about page...');
})

app.get('/user/:userId', (req,res) => {
   // console.log(req.query);
    console.log(req.params);
    res.send({firstName:"Vivek", lastName:"Vanga"})
})

app.post('/user', (req,res) => {
    res.send('Data successfully saved to Database');
})

app.delete('/user', (req,res) => {
    res.send('Deleted Successfully');
})
app.use("/",(req, res) => {
    res.send("Hello from the server!");
})

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777...");
})


// git remote add origin https://github.com/Vivek-9/devTinder.git
// git branch -M main
// git push -u origin main