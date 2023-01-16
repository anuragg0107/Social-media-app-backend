const express= require("express")
const postRouter= express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {postModel}= require("../models/Register.model")
const {Authorization} = require("../middleware/Auth.midddleware")
const {validator} =require("../middleware/Validator.middleware")


postRouter.get("/posts",Authorization,async(req,res)=>{   
    try{
        const { data } = req.body
        const query= data?{data}:{}
        const posts= await postModel.find(query)
    res.json(posts)
    }
    catch(err){
     res.send({"err":err})
     console.log(err)
    }
})

postRouter.patch("/update/:id",Authorization,async(req,res)=>{
    const ID= req.params.id
    const payload=req.body
    try{
        await userModel.findByIDandUpdate({_id:ID},payload)
        res.send("The document is updated")
    }
    catch(err){
      res.send({"err":err})
      console.log(err)
    }
})

postRouter.delete("/delete/:id",Authorization,async(req,res)=>{
    const ID= req.params.id
    try{
        await userModel.findByIDandRemove({_id:ID})
        res.send("The document is deleted")
    }
    catch(err){
      res.send({"err":err})
      console.log(err)
    }
})


module.exports={postRouter}