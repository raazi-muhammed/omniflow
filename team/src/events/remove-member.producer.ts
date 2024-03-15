import { Producer } from "kafkajs";

export function buildRemoveMemberProducer(producer: Producer) {
    return async (data: { userEmail: string; projectId: string }) => {
        await producer.send({
            topic: "remove-member-from-team",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
