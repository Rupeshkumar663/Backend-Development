import { Worker } from "bullmq";
import connection from "../config/redis.js";

const dlqWorker=new Worker(
  "dlq-queue",
  async (job)=>{
    console.log("DLQ JOB:");
    console.log(job.data);
  },
  {connection}
);

export default dlqWorker;