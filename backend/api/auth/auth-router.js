const express = require("express");
const UserData = require("../users/user-model")
const bcrypt = require('bcryptjs')
const {validateRegisterBody,validateRegisterUniqueness,validateUsername} = require("./auth-middleware"); 

const router = express.Router();


router.post("/register",validateRegisterBody,validateRegisterUniqueness,async(req,res,next)=> {
    try {
       const {username,password} = req.body;
       const hash = bcrypt.hashSync(password,16);
       const newUser = {
        user_username : username,
        user_password : hash,
       }
       const result = await UserData.add(newUser); //eslint-disable-line
       res.status(201).json({message : `Welcome ${username}`})
    } catch (err) {next(err)}
})


router.post("/login",validateUsername,async(req,res,next)=> {
    try {
        const {username,password} = req.body; //eslint-disable-line
        const user = req.user;
        if (user && bcrypt.compareSync(password,user.user_password)) {
            req.session.user = user;
            res.json({message : `Welcome back ${user.user_username}`})
        } else {
            next({status : 401, message : "incorrect username or password"})
        }
      
    } catch (err) {next(err)}
})


router.get("/logout",async(req,res,next)=> {
    try {
        console.log("logout working")
    } catch (err) {next(err)}
})

module.exports = router;