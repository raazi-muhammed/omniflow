import { Kafka } from "kafkajs";
import { logger, validateBody } from "@omniflow/common";
import { IMemberUseCases } from "../../interfaces/use-case.interface.js";
import { AccessLevels } from "../../interfaces/entity.interface.js";

export async function addMemberToTeamConsumer({
    kafka,
    memberUseCases,
}: {
    kafka: Kafka;
    memberUseCases: IMemberUseCases;
}) {
    const consumer = kafka.consumer({ groupId: "add-member-to-team" });

    await consumer.connect();
    await consumer.subscribe({
        topic: "add-member-to-team",
        fromBeginning: true,
    });

    consumer.run({
        eachMessage: async ({ topic, message }) => {
            logger.debug(`consumer: ${topic}`);
            try {
                const data = JSON.parse(message.value.toString());
                validateBody(data, ["userData", "projectId"]);
                await memberUseCases.addProjectLead({
                    email: data.userData.email,
                    name: data.userData.name,
                    projectId: data.projectId,
                    username: data.userData.username,
                });
                await memberUseCases.changeMemberAccess({
                    access: {
                        apiDoc: AccessLevels.CAN_EDIT,
                        dbDesign: AccessLevels.CAN_EDIT,
                        module: AccessLevels.CAN_EDIT,
                    },
                    projectId: data.projectId,
                    userName: data.userData.username,
                });
            } catch (error) {
                logger.error(error);
            }
        },
    });
}
