module.exports = {
async protect(req,res,next) {
    if (req.session.user) {
        console.log(req.session)
        next();
    } else {
        next({status : 401, message : "must login before seeing this"})
    }
}
}