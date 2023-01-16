const jwt= require("jsonwebtoken")
const { userModel } = require("../models/User.model")
require("dotenv").config()
const Authorization=async(req,res,next)=>{

    try{
        const data= req.headers.Authorization.split(" ")[1]
        const decoded = jwt.verify(data,process.env.secretkey)
        const user= await userModel.findById(decoded.userId)
        if(!user){
           return res.status(401).json({
        message:"There are no token"
    })  
        }
        req.user=user
        next()
    }
   catch(err){
   res.status(401).json({message:"Invalid token"})
   }
}

module.exports={Authorization}