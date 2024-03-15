import { Kafka } from "kafkajs";
import { IProjectController } from "../../interfaces/controller.interface.js";
import { validateBody } from "@omniflow/common";

export async function addMemberToProjectConsumer({
    kafka,
    projectController,
}: {
    kafka: Kafka;
    projectController: IProjectController;
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
                projectController.addProjectMember(data);
            } catch (error) {
                console.log(error);
            }
        },
    });
}
