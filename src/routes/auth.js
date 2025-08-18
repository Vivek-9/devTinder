const express = require('express');
const bcrypt = require('bcrypt');

const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");


authRouter.post("/signup", async(req, res)=>{ 
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
authRouter.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT();
            console.log(token)

            res.cookie('token',token, {
                expoires: new Date(Date.now() + 8 * 3600000)
            })
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


module.exports = authRouter;