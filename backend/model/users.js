const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const users = require("../controller/crub");
const { use } = require("../routers/news");


const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        require : true,
        lowercase: true,
        trim: true,
        minlength : 2,
        maxlength : 100
    },
    email : {
        type : String , 
        require : true,
        unique :true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password : {
        type : String,
        require : true,
        minlength : 8
    }
},
{timestamps:true}
);



userSchema.statics.register  = async function(name,email,password) {
    
    try{
        const userInfo = await this.findOne({email});
        if(userInfo){
            throw new Error("Email is already Exit!");
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password,salt);
        const store = await this.create({name,email,password : hash});
    
        return store;

    }catch(err){
        console.log("Schema login error Part",err.message);
        throw new Error("There is no data in register function!")
    }
}
userSchema.statics.login = async function(email,password) {
   
        // console.log(email,password);
        const userInfo = await this.findOne({email : email});
        // console.log(userInfo);
        if(!userInfo){
            throw new Error( "Email doesn't register yet!");
        };
        // console.log(userInfo.hash);

        const userPassword = await bcrypt.compare(password,userInfo.password);
        if(userPassword){
            return userInfo;
        }else{
            throw new Error("Password is wrong")
        }
   
}
const Users = mongoose.model("Users",userSchema);

module.exports = Users;