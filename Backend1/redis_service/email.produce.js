import { emailqueue } from "./email_queue";
export const sendEmailJob=async(data)=>{
    await emailqueue.add("send-mail",data,{delay:2000})
}