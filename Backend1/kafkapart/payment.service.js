
import { kafka } from "../kafkapart/kafka";
import { TOPICS } from "../kafkapart/Topic";
const consumer=kafka.consumer({ groupId: "payment-group" });
const producer=kafka.producer();

const start=async()=>{
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: TOPICS.ORDER_CREATED });
  await consumer.run({
    eachMessage:async({ message })=>{
      const order=JSON.parse(message.value!.toString());
      console.log("Processing payment:", order);
      await producer.send({
        topic:TOPICS.PAYMENT_COMPLETED,
        messages:[{ value: JSON.stringify(order) }],
      });
    },
  });
};

start();