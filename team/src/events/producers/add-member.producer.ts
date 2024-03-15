import { Producer } from "kafkajs";
import { IMember } from "../../interfaces/entity.interface.js";

export function buildAddMemberProducer(producer: Producer) {
    return async (data: { userData: IMember; projectId: string }) => {
        await producer.send({
            topic: "add-member-to-project",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
