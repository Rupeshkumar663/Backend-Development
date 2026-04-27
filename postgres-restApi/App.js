import express from "express"
import dotenv from "dotenv"
import { createemployee } from "./employee.js"
const app=express()


dotenv.config()
const PORT=5000
app.use(express.json())
app.post('/add',createemployee)//route

/*app.get("/",(req,res)=>{
    res.send("Server started");
})*/
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})