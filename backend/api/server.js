const express = require("express");
//bringing in middleware
const morgan = require("morgan");
const helmet = require("helmet");
//bringing in middleware

//instantiate
const server = express();
//instantiate

//global middleware
server.use(express.json());
server.use(morgan("dev"))
server.use(helmet());
//global middleware


//global fail middleware
server.use("*",(req,res,next)=> {
    next({status : 404, message : "not found"})
})
server.use((error,req,res,next)=> { //eslint-disable-line
    res.status(error.status || 500).json({
        message : error.message,
        stack : error.stack, 
    })
})
//global fail middleware

module.exports = server;