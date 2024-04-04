import { Kafka } from "kafkajs";
import { loadEnv, logger } from "@omniflow/common";
import { addMemberToTeamConsumer } from "./consumer/add-member-to-team.consumer.js";
import { memberUseCases } from "../use-cases/index.js";

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
producer
    .connect()
    .then(() => {
        logger.info("Producer status\t: Connected");
        addMemberToTeamConsumer({ kafka, memberUseCases });
    })
    .catch((err) => {
        logger.error("Producer status\t: Not connected", err);
    });
