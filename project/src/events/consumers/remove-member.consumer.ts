import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { logger, validateBody } from "@omniflow/common";

export async function removeMemberFromProjectConsumer({
    kafka,
    projectController,
}: {
    kafka: Kafka;
    projectController: IProjectController;
}) {
    const consumer = kafka.consumer({ groupId: "remove-member-from-team" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "remove-member-from-team",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userEmail", "projectId"]);
                projectController.removeProjectMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
