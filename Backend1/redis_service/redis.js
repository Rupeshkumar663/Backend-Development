import IORedis from "ioredis";//Ioredis iska work hai redis se connect krna
const connection=new IORedis({port:6379});
export default connection;

