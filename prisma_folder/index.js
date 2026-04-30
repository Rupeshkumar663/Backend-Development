import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
const app=express()
dotenv.config()
const PORT=process.env.PORT ||6000
app.use(express.json())

app.use("/users",userRoute)
 
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})