import { Kafka } from "kafkajs";

const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER_ADDRESS) {
    throw new Error("Kafka borker adres not found on env");
}
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
console.log("consumer connected");
await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
console.log("subscribed connected");

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            value: message.value.toString(),
        });
    },
});
