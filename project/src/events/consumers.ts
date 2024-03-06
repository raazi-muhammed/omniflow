import { Kafka } from "kafkajs";
import projectController from "../controllers/index.js";

const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER;
if (!KAFKA_BROKER_ADDRESS) {
    throw new Error("Kafka broker address not found on env");
}

export async function connectKafka() {
    const kafka = new Kafka({
        clientId: "my-app",
        logLevel: 0,
        brokers: ["kafka:9092"],
    });
    const consumer = kafka.consumer({ groupId: "test-group" });

    await consumer.connect();

    await consumer.subscribe({
        topic: "member-added-to-team",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            switch (topic) {
                case "member-added-to-team":
                    projectController.addMemberToProject(
                        JSON.parse(message.value.toString())
                    );
                    break;

                default:
                    console.log({
                        value: message.toString(),
                    });
                    break;
            }
        },
    });
    console.log(`Kafka status \t\t\t: Listening`);
}
