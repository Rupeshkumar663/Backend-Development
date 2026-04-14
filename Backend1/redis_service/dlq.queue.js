import { Queue } from "bullmq";
import connection from "../config/redis.js";
const dlqQueue=new Queue("dlq-queue",{
  connection,
});
export default dlqQueue;