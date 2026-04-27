import express from "express";
import { kafka } from "../shared/kafka";
import { TOPICS } from "../shared/types";
const app=express();
app.use(express.json());
const producer=kafka.producer();
app.post("/user",async(req,res)=>{
  await producer.connect();
  await producer.send({
    topic:TOPICS.USER_CREATED,
    messages:[{ value: JSON.stringify(req.body)}],
  });
  res.json({ message:"User created event sent" });
});

app.listen(3000,()=>console.log("User Service running"));