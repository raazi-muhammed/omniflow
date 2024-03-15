import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { ITeamController } from "../../interfaces/controller.interface.js";

export async function addMemberToTeamConsumer({
    kafka,
    teamController,
}: {
    kafka: Kafka;
    teamController: ITeamController;
}) {
    const consumer = kafka.consumer({ groupId: "add-member-to-team" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "add-member-to-team",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userData", "projectId"]);
                teamController.addMemberToTeam(data);
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
