const express = require("express");

const connectDB = require('./config/database');
const app = express(); 
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async(req, res)=>{ 
    const user = new User(req.body);
    try{
        await user.save(); 
        res.send("User Added successfully!"); 
    }
    catch(err){
        res.status(400).send("Error saving the user: "+ err.message);
    }
    
})

app.get("/users", async (req, res) => {
    const userEmailId = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmailId});
    if(user.length === 0){
        res.status(400).send("User not found");
    }
    else{
        res.send(user);
    }
    }
    // try{
    // const user = await User.find({emailId: userEmailId});
    // if(user.length === 0){
    //     res.status(400).send("User not found");
    // }
    // else{
    //     res.send(user);
    // }
    // }
    catch(err){
        res.status(400).send("something went wrong");
    }
})



app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id:userId});
        // const user = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    }
    catch(err){
        res.status(400).send("Something went srong");
    }
})

app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const body = req.body;
    try{
        const update = await User.findByIdAndUpdate({_id:userId}, body, {
            runValidators: true
        });
        res.send("Updated Successfully");
    }
    catch(err){
        res.status(400).send("Update failed"+ err.message);
    }
})
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777...");
}) 
    })
    .catch((err) => { 
        console.error("Database connot be connected!!");
    })




// git remote add origin https://github.com/Vivek-9/devTinder.git
// git branch -M main
// git push -u origin main