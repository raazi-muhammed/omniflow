import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../../interfaces/use-case.interface.js";

export async function removeMemberFromProjectConsumer({
    kafka,
    memberUseCases,
}: {
    kafka: Kafka;
    memberUseCases: IMemberUseCase;
}) {
    const consumer = kafka.consumer({ groupId: "remove-member-from-project" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "remove-member-from-project",
        fromBeginning: true,
    });

    consumer.run({
        /**
         * Consumer to add a member to project
         * @param {string} message.userEmail
         * @param {string} message.projectId
         */
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userEmail", "projectId"]);
                await memberUseCases.removeMemberFromProject(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
