import express from "express"
import dotenv from "dotenv"
import { createemployee } from "./employee.js"
const app=express()
dotenv.config()
const PORT=process.env.PORT ||6000
app.use(express.json())

app.post('/adduser',createemployee);
/*app.get("/",(req,res)=>{
    res.send("mubarak ho tm home page pe ho")
}) */
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})