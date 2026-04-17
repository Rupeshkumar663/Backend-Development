import connection from "./redis"
export const subscribers=async()=>{
  try {
      await connection.subscribe("user-channel");//
      console.log("data rechead at subscriber");
      Redis.on("user-channel",(channel,message)=>{
        try {
           const parsemessage=JSON.parse(message);
           console.log(`Recieved notification from ${channel}`,parsemessage)

        } catch(error){
          console.log("error parse message",error)
        }
        
      })
  } catch(error){
    consolelog("error subscribing",error)
  }
}