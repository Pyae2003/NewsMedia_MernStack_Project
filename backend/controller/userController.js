const { token } = require("morgan");
const Users = require("../model/users");
const createdtoken = require("../jwt/usersToken");
// const cookieParser = require("cookie-parser");


const users = {
    login : async(req,res)=>{
       try{
         const {email,password} = req.body;
         console.log(email,password)
         const user = await Users.login(email,password);
         const jwt = await createdtoken(email);
         res.cookie("jwt",jwt,{ 
            maxAge : 60*60*24*5*1000,
            httpOnly:true
        });
         return res.status(200).json({data : user,token : jwt});
       }catch(error){
        //  console.log(error)
         return res.status(400).json({ error: error.message });
        }
    },
    register : async(req,res)=>{
     try{
        const {name,email,password} = req.body;
        const user = await Users.register(name,email,password);
        const jwt = await createdtoken(email);
        console.log(jwt)
        res.cookie("jwt",jwt,{
            maxAge : 60*60*24*5 * 1000,
            httpOnly:true
        });
        return res.status(200).json({message : "register is successfully!", data :user,token : jwt});
     }catch(error){
        console.log(error.massage)
        return res.status(400).json({error : error.message})
     }//try catch error handling branket
    },
    logout : async(req,res)=>{
            res.clearCookie("jwt",{httpOnly:true});//delete cookies
            return res.json({message : 'logout process success'})
    }
};

module.exports = users;