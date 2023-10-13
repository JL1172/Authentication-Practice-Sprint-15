const express = require("express");
const UserData = require("../users/user-model")
const bcrypt = require('bcryptjs')
const {validateRegisterBody,validateRegisterUniqueness} = require("./auth-middleware"); 

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


router.post("/login",async(req,res,next)=> {
    try {
        console.log("login working")
    } catch (err) {next(err)}
})


router.get("/logout",async(req,res,next)=> {
    try {
        console.log("logout working")
    } catch (err) {next(err)}
})

module.exports = router;