import { PrismaClient } from "@prisma/client";
import express from "express"
const app = express();
app.use(express.json());
const prisma=new PrismaClient()

app.post("/create", async (req, res) =>{
    try{
        const {email, name} = req.body;
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name
            }
        })
        return res.status(201).json({
            msg: "User created..",
            user
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
})


app.get("/users", async(req, res)=>{
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            users
        })
    } 
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
})

app.listen(3000);