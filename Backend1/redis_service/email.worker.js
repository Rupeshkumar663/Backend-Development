import { Worker, QueueScheduler } from "bullmq";//bull MQ
import connection from "../config/redis.js";
import dlqQueue from "../queues/dlq.queue.js";

new QueueScheduler("email-queue",{connection});
const emailWorker=new Worker(
  "email-queue",
  async(job)=>{
    console.log("Processing:",job.name);
    const {to,subject}=job.data;

    if(!to){
      throw new Error("Email missing");
    }
    console.log(`Email sent to ${to} with subject "${subject}"`);
  },

  {
    connection,
    concurrency:5, 
    limiter:{
      max:10,       
      duration:1000 
    },
  }
);

emailWorker.on("completed",(job)=>{
  console.log(`Done: ${job.id}`);
});

emailWorker.on("failed",async(job,err)=>{
  console.log(`Failed:${job.id}`);
  await dlqQueue.add("failed-email",{
    data:job.data,
    error:err.message,
  });
});

export default emailWorker;