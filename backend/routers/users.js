const express = require("express");
const users = require("../controller/userController");
const { body } = require("express-validator");
const validator = require("../validator/validator");

const Users = require("../model/users");

const router = express.Router();

router.post("/login",users.login);

router.post("/register",[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").custom(async(value)=>{
        const userInfo = await Users.findOne({email : value});
        if(userInfo){
            throw new Error("Email already Exit!.Try another one...")
        }
    }).isEmail().withMessage("Email is not correct!"),
    body("password").notEmpty().withMessage("Password is required!")
],validator,users.register);

router.post("/logout",users.logout)


module.exports = router;