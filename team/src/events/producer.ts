import { Kafka } from "kafkajs";
import { buildAddMemberProducer } from "./add-member.producer.js";
import { IAddMemberProducer } from "../interfaces/events.interface.js";

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

const productAddMember: IAddMemberProducer = buildAddMemberProducer(producer);

const eventProducer = Object.freeze({
    productAddMember,
});

export default eventProducer;
