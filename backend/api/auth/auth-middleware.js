const yup = require("yup");
const db = require("../../data/db-config");


const schema = yup.object().shape({
    username : yup.string().required("username is required").min(5,"username must be longer than 5 characters"),
    password : yup.string().required("password is required").min(8, "password must be longer than 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must contain a special character, number, capital letter, and lowercase letter"),
});

module.exports = {
    validateRegisterBody,
    validateRegisterUniqueness,
    validateUsername
}

async function validateRegisterBody(req,res,next) {
    try {
        const isValid = schema.validateSync(req.body, {abortEarly : false, stripUnknown : true}) //eslint-disable-line
        next(); 
    } catch (err) {
        next({status : 422, message : {error : err.errors}});
    }
}

async function validateRegisterUniqueness(req,res,next) {
    try {
        const {username} = req.body;
        const isUnique = await db("users").where({user_username : username}).first();
        if (!isUnique) {
            next();
        } else {
            next({status : 400, message : "username taken"})
        }
    } catch (err) {
        next(err)
    }
}
async function validateUsername(req,res,next) {
    try {
        const {username} = req.body;
        const isUnique = await db("users").where({user_username : username}).first();
        if (!isUnique) {
            next({status : 400, message : "user does not exist"})
        } else {
            req.user = isUnique; 
            next();
        }
    } catch (err) {
        next(err)
    }
}