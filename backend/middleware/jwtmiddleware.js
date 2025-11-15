const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.jwtsecret,(err)=>{
            if(err){
                return res.status(400).json({message : "Token is not valid..."})
            }
            next()
        })
    }else{
        return res.status(400).json({message:"Token is needed!"})
    };
};

module.exports = authMiddleware;


