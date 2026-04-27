
import { kafka } from "../shared/kafka";
import { TOPICS } from "../shared/types";
const consumer=kafka.consumer({ groupId: "order-group" });
const producer=kafka.producer();
const start = async () => {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: TOPICS.USER_CREATED });
  await consumer.run(
    {
    eachMessage:async({ message })=>{
      const user=JSON.parse(message.value!.toString());
      console.log("Creating order for user:", user);
      await producer.send({
          topic:TOPICS.ORDER_CREATED,
          messages:[{ value: JSON.stringify({ userId: user.id }) }],
      });
    },
  });
};

start();