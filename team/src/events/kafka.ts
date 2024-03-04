import { Kafka } from "kafkajs";

const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER_ADDRESS) {
    throw new Error("Kafka borker adres not found on env");
}
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
});

const producer = kafka.producer();

await producer.connect();
console.log("producer connected");

await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
});

await producer.disconnect();
