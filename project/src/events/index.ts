import { Kafka } from "kafkajs";
import projectController from "../controllers/index.js";
import { loadEnv, logger } from "@omniflow/common";
import { removeMemberFromProjectConsumer } from "./consumers/remove-member.consumer.js";
import { addMemberToProjectConsumer } from "./consumers/add-member.consumer.js";

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

        removeMemberFromProjectConsumer({ kafka, projectController });
        addMemberToProjectConsumer({ kafka, projectController });
    })
    .catch((err) => {
        logger.error("Producer status\t: Not connected", err);
    });

logger.info(`Kafka status \t\t: Listening`);
