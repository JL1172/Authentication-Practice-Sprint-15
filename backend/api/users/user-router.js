const express = require("express");
const {protect} = require("./user-middleware");
const path = require("path");
const UserData = require("./user-model");
const router = express.Router();

router.get("/",protect,async(req,res,next)=> {
    try {
        const data = await UserData.findAll();//eslint-disable-line
        res.status(200).sendFile(path.join(__dirname,"./protected.html"))
    } catch (err) {next(err)}
})

router.get("/debug",protect,async(req,res,next)=> {
    try {
        const data = await UserData.access(1);
        res.status(200).json(data.protected_information); 
    } catch (err) {next(err)}
})

module.exports = router;
