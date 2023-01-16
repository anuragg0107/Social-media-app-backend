
const validator=(req,res,next)=>{
   const {name,email,password,gender}= req.body
   if(!name || !email || !password || !gender){
    return res.status(401).json({message:"All the detailed filled required "})
   }
   next()
}
module.exports={validator}