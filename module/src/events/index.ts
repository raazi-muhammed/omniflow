import { Kafka } from "kafkajs";
import { loadEnv, logger } from "@omniflow/common";
import { editMemberConsumer } from "./consumers/edit-member.consumer.js";
import { memberController } from "../controllers/index.js";

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
        editMemberConsumer({ kafka, memberController });
    })
    .catch((err) => {
        logger.error("Producer status\t: Not connected", err);
    });

logger.info(`Kafka status \t: Listening`);
