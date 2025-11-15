const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title : {
        type : String,
        require : [true , "Title is required"],
        lowercase : true,
        trim : true
    },
    description : {
        type : String,
        require : [true,"description is required"],
        lowercase : true,
        trim : true
    },
    author : {
        type : String ,
        require : [true , "author is required"],
        lowercase : true,
        trim : true
    },
    type : {
        type : Array,
        require : true
    }

},
{
    timestamps : true
});

const News = mongoose.model("News",Schema);

module.exports = News;