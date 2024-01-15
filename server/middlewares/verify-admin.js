const jwt = require("jsonwebtoken");
require('dotenv/config');

function varify_user(req, res, next){
    const adminToken = req.header("Authorization");
    if(!adminToken){
        return res.status(403).json({
            message: "You dont have access!"
        });
    }
    else{
        try{
            const decoded = jwt.verify(adminToken.split(" ")[1], process.env.TOKEN_SECRET_KEY)
            if(decoded.user.role !== "admin"){
                throw new Error("Token is not valid!")
            }
            req.user = decoded.user;
            next(); 
        }
        catch(err){
            res.status(401).json({
              message: err.message
            })
        }
    }
}

module.exports = varify_user;