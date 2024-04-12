import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../../interfaces/use-case.interface.js";

export async function addMemberToProjectConsumer({
    kafka,
    memberUseCases,
}: {
    kafka: Kafka;
    memberUseCases: IMemberUseCase;
}) {
    const consumer = kafka.consumer({ groupId: "add-member-to-project" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "add-member-to-project",
        fromBeginning: true,
    });

    consumer.run({
        /**
         * Consumer to add a member to project
         * @param {string} message.projectId
         * @param {string} message.userData.username
         * @param {string} message.userData.email
         * @param {string} [message.userData.avatar]
         */
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userData", "projectId"]);

                await memberUseCases.addMemberToProject(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
