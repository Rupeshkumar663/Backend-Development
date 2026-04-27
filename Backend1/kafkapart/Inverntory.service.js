
import { kafka } from "../kafkapart/kafka";
import { TOPICS } from "../kafkapart/Topic";

const consumer=kafka.consumer({ groupId:"inventory-group"});
const start=async()=>{
  await consumer.connect();
  await consumer.subscribe({ topic:TOPICS.PAYMENT_COMPLETED });
  await consumer.run({
    eachMessage:async({ message })=>{
      const data=JSON.parse(message.value!.toString());
      console.log("Updating inventory for order:",data);
    },
  });
};

start();