import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { logger } from "@omniflow/common";

export async function addMemberToProjectConsumer({
    kafka,
    projectController,
}: {
    kafka: Kafka;
    projectController: IProjectController;
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
                await projectController.addProjectMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
