const jwt = require("jsonwebtoken");
require("dotenv").config();

const createdtoken = (email) =>{
    return jwt.sign({email :email} ,process.env.jwtsecret,{expiresIn : "1h"} )
}

module.exports = createdtoken;