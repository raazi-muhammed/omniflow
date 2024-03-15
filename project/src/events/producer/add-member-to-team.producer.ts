import { Producer } from "kafkajs";

export function buildAddMemberToTeamProducer(producer: Producer) {
    return async (data: {
        userData: { avatar: string; username: string; email: string };
        projectId: string;
    }) => {
        await producer.send({
            topic: "add-member-to-team",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
