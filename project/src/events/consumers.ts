import { Kafka } from "kafkajs";
import projectController from "../controllers/index.js";
import { loadEnv } from "@omniflow/common";

const { KAFKA_BROKER, KAFKA_CLIENT_ID } = loadEnv([
    "KAFKA_BROKER",
    "KAFKA_CLIENT_ID",
]);

export async function connectKafka() {
    const kafka = new Kafka({
        clientId: KAFKA_CLIENT_ID,
        logLevel: 0,
        brokers: [KAFKA_BROKER],
    });
    const consumer = kafka.consumer({ groupId: "test-group" });

    await consumer.connect();

    await consumer.subscribe({
        topic: "member-added-to-team",
        fromBeginning: true,
    });
    await consumer.subscribe({
        topic: "remove-member-from-team",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ topic, message }) => {
            switch (topic) {
                case "member-added-to-team":
                    projectController.addProjectMember(
                        JSON.parse(message.value.toString())
                    );
                    break;
                case "remove-member-from-team":
                    /* projectController.addProjectMember(
                        JSON.parse(message.value.toString())
                    ); */
                    console.log(JSON.parse(message.value.toString()));
                    projectController
                        .removeProjectMember(
                            JSON.parse(message.value.toString())
                        )
                        .then((res) => console.log({ res }))
                        .catch((err) => console.log({ err }));
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
