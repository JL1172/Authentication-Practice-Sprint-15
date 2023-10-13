const express = require("express");
const {protect} = require("./user-middleware");
const UserData = require("./user-model");

const router = express.Router();

router.get("/",protect,async(req,res,next)=> {
    try {
        const data = await UserData.findAll();
        res.status(200).json(data); 
    } catch (err) {next(err)}
})

router.get("/debug",protect,async(req,res,next)=> {
    try {
        const data = await UserData.access(1);
        res.status(200).json(data.protected_information); 
    } catch (err) {next(err)}
})

module.exports = router;
