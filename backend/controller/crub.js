const mongoose = require("mongoose")
const News = require("../model/schema.js");

const users = {
    posting : async (req,res)=>{
        try{
            const {title,description,author,type} = req.body;
            const data = await News.create({
            title : title,
            description : description,
            author : author,
            type :type
        });
        return res.json({data});

        }catch(e){
            return res.status(400).json({error : e.mapped()})
        }
        
    },

    showing :async(req,res)=>{
        try{
            const page = req.query.page ||"1";
            console.log(page);
            const limit = 5;
            const news = await News.find()
                            .skip((page-1) * limit)
                            .limit(limit)
                            .sort({createdAt : -1});
            
         
            //Get Item Counts from database 
            const counts = await News.countDocuments();
            const loopCounts  = Math.ceil(counts / limit);
            const dataLinks = {
                currentPage : page,
                nextPage : page == loopCounts ? false : true,
                previousPage : page == 1 ? false : true,
                loopLinks : [

                ]
            };

            for (let i = 1; i <= loopCounts; i++) {
               dataLinks.loopLinks.push({loopNumber : i})   
            };

            console.log(dataLinks);
            // console.log(counts);
            if(!news){
                return res.status(400).json({message : "Data is not having!"})
            };

            return res.status(200).json({ news ,dataLinks : dataLinks})
        }catch(error){
            return res.status(500).json({
             message : "network Error"
            })
        }
    },
    singleNews : async(req,res)=>{
        try{
            const id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : "This id is not valid!"});
            };

            const news = await News.findById(id);
            if(!news){
                return res.status(400).json({message : "There is no data"});
            };

            return res.status(200).json({message : news})
        }catch(err){

        }
    }
    ,

    Updating :async(req,res)=>{
        try{
            try{
                const id = req.params.id;
                if(!mongoose.Types.ObjectId.isValid(id)){
                   return res.status(400).json({message : " Id is not valid!"})
                };
       
                const news = await News.findByIdAndUpdate(id,{...req.body});
                if(!news){
                   return res.status(400).json({message : " Data is not having"});
                }
                return res.status(200).json({message : "updating is completed"})
              }catch(error){
                return res.status(500).json({
                   message : "Deleting Server Error"
                })
              }
            
        }catch(error){
            return res.status(500).json({
                message : "Deleting Server Error"
             })
        }
        
    },

    Deleting :async (req,res)=>{
       try{
         const id = req.params.id;
         if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : " Id is not valid!"})
         };

         const news = await News.findByIdAndDelete(id);
         if(!news){
            return res.status(400).json({message : " Data is not having"});
         }
         return res.status(200).json({data :news , message : "Deletiong is completed"})
       }catch(error){
         return res.status(500).json({
            message : "Deleting Server Error"
         })
       }
        
    }
};

module.exports = users;