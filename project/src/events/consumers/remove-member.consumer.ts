import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { logger } from "@omniflow/common";

export async function removeMemberFromProjectConsumer({
    kafka,
    projectController,
}: {
    kafka: Kafka;
    projectController: IProjectController;
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
                await projectController.removeProjectMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
