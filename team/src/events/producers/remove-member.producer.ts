import { logger } from "@omniflow/common";
import { Producer } from "kafkajs";

export function buildRemoveMemberProducer(producer: Producer) {
    return async (data: { userEmail: string; projectId: string }) => {
        logger.debug(`producer: remove-member-from-project`);
        await producer.send({
            topic: "remove-member-from-project",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
