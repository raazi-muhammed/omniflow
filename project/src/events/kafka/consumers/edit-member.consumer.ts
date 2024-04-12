import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../../interfaces/use-case.interface.js";

export async function editMemberConsumer({
    kafka,
    memberUseCases,
}: {
    kafka: Kafka;
    memberUseCases: IMemberUseCase;
}) {
    const consumer = kafka.consumer({ groupId: "edit-user" });

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
                validateBody(data, ["username", "name"]);
                await memberUseCases.editMember(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
