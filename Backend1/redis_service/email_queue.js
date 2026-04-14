import { Queue } from "bullmq";
import connection from "../redis_service/redis";

export const emailqueue=new Queue("email-queue",{
  connection,
  defaultJobOptions:{
    attempts:5, 
    backoff:{
      type:"exponential", 
      delay:3000, 
   },
    removeOnComplete:true, 
    removeOnFail:false,
  },
});
