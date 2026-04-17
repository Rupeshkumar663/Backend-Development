import connection from "./redis";

export const publisherMessage=async()=>{
   try{
       const {username,email,action}=req.body;
       await  connection.publish("user channel",JSON.stringify({username,email,action}));
        console.log(" published data");
   }catch(error){
     console.log("error published data",error);
   }
}