import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { logger, validateBody } from "@omniflow/common";

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
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userData", "projectId"]);
                projectController.addProjectMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
