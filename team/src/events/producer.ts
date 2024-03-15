import { Kafka } from "kafkajs";
import { buildAddMemberProducer } from "./add-member.producer.js";
import { IAddMemberProducer } from "../interfaces/events.interface.js";
import { loadEnv } from "@omniflow/common";

const { KAFKA_BROKER, KAFKA_CLIENT_ID } = loadEnv([
    "KAFKA_BROKER",
    "KAFKA_CLIENT_ID",
]);
const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    logLevel: 0,
    brokers: [KAFKA_BROKER],
});

export const producer = kafka.producer();
await producer.connect();
console.log("producer connected");

const productAddMember: IAddMemberProducer = buildAddMemberProducer(producer);

const eventProducer = Object.freeze({
    productAddMember,
});

export default eventProducer;
