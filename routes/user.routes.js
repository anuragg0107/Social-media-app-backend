const express= require("express")
const userRouter= express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userModel}= require("../models/User.model")
const {Authorization}= require("../middleware/Auth.midddleware")
const {validator} =require("../middleware/Validator.middleware")

// userRouter.get("/users",async(req,res)=>{
   
//     try{
//         let data;
//     data=await userModel.find()
//     res.send(data)
//     }
//     catch(err){
//      res.send({"err":err})
//      console.log(err)
//     }
// })

userRouter.post("/users/register",validator,async(req,res)=>{
    const {name,email,password,gender}=req.body
    const hidepassword=await bcrypt.hash(password,5)

    const userData= new userModel({
        name,email,password:hidepassword,gender
    })
   try{
    await userData.save()
    res.send(userData)
   }
   catch(err){
    console.log({"err":err})
    res.send(err)
   }
})

userRouter.post("/login",async(req,res)=>{
    try{
    const {email,password}=req.body
    const user= await userModel.findOne({email})
    if(!user){
        res.status(401).json({message:"User Can Not Found"})
    }
    const match= await bcrypt.compare(password,user.password)
    if(!match){
        return res.status(401).json({message:"Incorrect password"})
    }
    const token = jwt.sign({userId:user._id},process.env.secretkey)
    res.json({token})
    }
    catch(err){
        res.send(err)
        console.log({"err":err})
    }
})

// userRouter.patch("/users/:id",async(req,res)=>{
//     const ID= req.params.id
//     const payload=req.body
//     try{
//         await userModel.findByIDandUpdate({_id:ID},payload)
//         res.send("The document is updated")
//     }
//     catch(err){
//       res.send({"err":err})
//       console.log(err)
//     }
// })

// userRouter.delete("/users/:id",async(req,res)=>{
//     const ID= req.params.id
//     try{
//         await userModel.findByIDandRemove({_id:ID})
//         res.send("The document is deleted")
//     }
//     catch(err){
//       res.send({"err":err})
//       console.log(err)
//     }
// })

module.exports={userRouter}
