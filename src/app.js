const express = require("express");
const connectDB = require('./config/database');
const app = express(); 
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res)=>{ 
    try{
        // Validation of data
        validateSignUpData(req);
        // Encrypt the password
        const {firstName, lastName, emailId,password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        firstName, 
        lastName,
        emailId,
        password: passwordHash
    });
    
        await user.save(); 
        res.send("User Added successfully!"); 
    }
    catch(err){
        res.status(400).send("Error saving the user: "+ err.message);
    }
    
})

app.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

            const token = await jwt.sign({_id:user._id}, "Vivek@123");
            console.log(token)

            res.cookie('token',token)
            res.send("Login Successful!!!");
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch (err){
            res.status(400).send("Error : " + err.message);
    }
})

app.get("/profile", userAuth, async(req, res) =>{
    try{  
    const user = req.user;
    console.log(user);
    res.send(user); 
    }
    catch(err){
        res.status(400).send("Error Message : "+ err.message)
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

app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const body = req.body;

   
    try{
         const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

    const isUpdateAllowed = Object.keys(body).every(k => ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(body?.skills.length > 10){
        throw new Error("Skills cannot be more than 10");
    }
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