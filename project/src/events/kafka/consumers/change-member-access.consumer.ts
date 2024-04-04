import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { IMemberUseCase } from "../../../interfaces/use-case.interface.js";

export async function changeMemberAccessConsumer({
    kafka,
    memberUseCases,
}: {
    kafka: Kafka;
    memberUseCases: IMemberUseCase;
}) {
    const consumer = kafka.consumer({ groupId: "change-member-access" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "change-member-access",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                logger.debug(`consumer: ${topic}`);
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["access", "projectId", "userName"]);
                await memberUseCases.changeMemberAccess({
                    access: data.access,
                    projectId: data.projectId,
                    userName: data.userName,
                });
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
