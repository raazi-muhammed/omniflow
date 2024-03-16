import { Producer } from "kafkajs";
import { IMember } from "../../interfaces/entity.interface.js";
import { logger } from "@omniflow/common";

export function buildAddMemberProducer(producer: Producer) {
    return async (data: { userData: IMember; projectId: string }) => {
        logger.debug(`producer: add-member-to-project`);
        await producer.send({
            topic: "add-member-to-project",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
