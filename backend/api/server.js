const express = require("express");
//bringing in middleware
const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors")

const session = require("express-session")
const Store = require('connect-session-knex')(session)
//bringing in middleware


//bringin in routes
const AuthRouter = require("./auth/auth-router");
const ProtectedRoute = require("./users/user-router");
//bringin in routes


//instantiate
const server = express();
//instantiate

//global middleware
server.use(express.json());
server.use(morgan("dev"))
server.use(cors({
  origin : "http://localhost:3000",
  credentials: true,
}));
// server.use(helmet());



server.use(session({
    name : "session_cookie",
    secret : "keep it secret session",
    cookie : {
      maxAge : 1000 * 60 * 60,
      secure : false,//if true only works over https
      httpOnly : false, //means js on page can read the cookie 
      domain : "localhost",
      path : "/"
    },
    rolling : true,
    sameSite : "none",
    resave : false,
    saveUninitialized : false, //this means only cookie for approved cookies
    store : new Store({
      knex : require("../data/db-config.js"),
      tablename : "sessions_users",
      sidfieldname : "user_sid",
      createtable : true,
      clearInterval : 1000 * 60 * 60,
    })
  }))
  
//global middleware


//routes
server.use("/api/auth",AuthRouter)
server.use("/api/protected",ProtectedRoute)
//routes

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