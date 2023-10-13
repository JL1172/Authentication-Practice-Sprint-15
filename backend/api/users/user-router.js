const express = require("express");
const {protect} = require("../auth/auth-middleware");
const UserData = require("./user-model");

const router = express.Router();

router.get("/:id",protect,async(req,res,next)=> {
    try {
        const data = await UserData.access(req.params.id);
        res.status(200).json(data.protected_information); 
    } catch (err) {next(err)}
})

module.exports = router;
