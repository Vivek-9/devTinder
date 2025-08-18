const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');


profileRouter.get("/profile", userAuth, async(req, res) =>{
    try{  
    const user = req.user;
    console.log(user);
    res.send(user); 
    }
    catch(err){
        res.status(400).send("Error Message : "+ err.message)
    }
})

module.exports = profileRouter;

