import { logger } from "@omniflow/common";
import { Producer } from "kafkajs";

export function buildAddMemberToTeamProducer(producer: Producer) {
    return async (data: {
        userData: { avatar: string; username: string; email: string };
        projectId: string;
    }) => {
        logger.debug(`producer: add-member-to-team`);
        await producer.send({
            topic: "add-member-to-team",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
