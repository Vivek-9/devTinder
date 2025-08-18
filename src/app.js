const express = require("express");
const connectDB = require('./config/database');
const app = express(); 
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requstRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requstRouter);











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