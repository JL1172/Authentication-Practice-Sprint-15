module.exports = {
async protect(req,res,next) {
    console.log(req.session)
    if (req.session.user) {
        next();
    } else {
        next({status : 401, message : "must login before seeing this"})
    }
}
}