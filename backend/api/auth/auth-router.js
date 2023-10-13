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
       res.status(201).json({data : result.user_id ,message : `Welcome ${username}`})
    } catch (err) {next(err)}
})


router.post("/login",validateUsername,async(req,res,next)=> {
    try {
        const {username,password} = req.body; //eslint-disable-line
        const user = req.user;
        if (user && bcrypt.compareSync(password,user.user_password)) {
            req.session.user = user;
            res.json({data : req.user.user_id,message : `Welcome back ${user.user_username}`})
        } else {
            next({status : 401, message : "incorrect username or password"})
        }
      
    } catch (err) {next(err)}
})


router.get("/logout",async(req,res,next)=> {
    try {
        if (req.session.user) {
            const {user_username} = req.session.user;
            req.session.destroy(err=> {
                if (err) {
                    res.json({message : "Goodluck leaving"})
                } else {
                    res.set('Set-Cookie', "monkey=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00")
                    res.json({message : `Goodbye ${user_username}`})
                }
            })
        } else {
            res.json({message : "who are you?"})
        }
    } catch (err) {next(err)}
})

module.exports = router;