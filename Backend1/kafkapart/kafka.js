
import { Kafka } from "kafkajs";
export const kafka=new Kafka({
  clientId:"ecommerce-app",
  brokers:["localhost:9092"],
});