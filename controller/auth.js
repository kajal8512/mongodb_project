const { status } = require("express/lib/response");
const jwt = require("jsonwebtoken")
function auth(req,res,next){
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verify = jwt.verify(token,"oiuytrertyui");
        console.log(verify);
        if(verify){
            return res.send(verify)
        }
    next();
    }catch{
        res.status(400).send("Invaid token")
    }
}
module.exports = {auth}