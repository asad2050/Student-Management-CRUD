const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');


const verify = (req,res,next)=>{
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === "Bearer" 
    ){
      const secretKey = process.env.JWT_SECRET_KEY || "secretkey"
        jwt.verify(
            req.headers.authorization.split(' ')[1], 
            secretKey, 
            async function(err, decoded) {
                if(err){
                    return res.status(409).json({message: "Invalid JWT Token"})
                }
                let foundUser  = await UserModel.findById(decoded.id);
                req.user = foundUser;
                next();
        });
    }else{
        return res.status(404).json({message: "Token not found"})
    }

}

module.exports = verify;