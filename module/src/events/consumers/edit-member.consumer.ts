import { Kafka } from "kafkajs";
import { IMemberController } from "../../interfaces/controller.interface.js";
import { logger } from "@omniflow/common";

export async function editMemberConsumer({
    kafka,
    memberController,
}: {
    kafka: Kafka;
    memberController: IMemberController;
}) {
    const consumer = kafka.consumer({ groupId: "module-edit-user" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "edit-user",
        fromBeginning: true,
    });

    consumer.run({
        /**
         * Consumer to add a member to project
         * @param {string} message.username
         * @param {string} message.name
         * @param {string} [message.avatar]
         */
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                await memberController.editMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
