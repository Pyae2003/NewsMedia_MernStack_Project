const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config()
const app = express();
const cors = require("cors")
const news = require("./routers/news.js");
const users = require("./routers/users.js");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/jwtmiddleware.js");
//===middleware Pare ===
app.use(morgan("dev"));
app.use(cors({
    origin :"http://localhost:5173",  
    credentials : true
}))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.mongoURl).then(()=>{
    console.log("Database connection is successfully completed.");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Running on ${process.env.PORT}!`)
    });
}).catch((err)=>{
    console.log("Database connection Error!",err)
})


app.use("/api/news",authMiddleware,news);
app.use("/api/users/",users);

// app.get("/set-cookie",(req,res)=>{
//     // res.setHeader("set-cookie","message = this is next cookie"); old method
//     res.cookie("Pyaekhant","Pyaekhant like cookie than lee pal",{httpOnly:true})
//     return res.send("Cookie set is completed")
// });

// app.get("/get-cookie",(req,res)=>{
//     const cookis = {...req.cookies};
//     return res.send(cookis)

// })




