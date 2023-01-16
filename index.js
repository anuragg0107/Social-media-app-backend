const express= require("express")
const {connection}= require("./config/db")
const { userRouter } = require("./routes/user.routes")
const {postRouter} =require("./routes/Register.route")
require("dotenv").config()
const app= express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("this is home page")
})
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try{
     await connection
     res.send("connected to db")
    }
    catch(err){
     console.log("not connected to db")
    }
    console.log(`running at port ${process.env.port}`)
})