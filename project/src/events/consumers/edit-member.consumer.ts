import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { logger } from "@omniflow/common";

export async function editMemberConsumer({
    kafka,
    projectController,
}: {
    kafka: Kafka;
    projectController: IProjectController;
}) {
    const consumer = kafka.consumer({ groupId: "edit-user" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "edit-user",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                await projectController.editMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
