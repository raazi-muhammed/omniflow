import { Producer } from "kafkajs";
import { IAccess } from "../../interfaces/entity.interface.js";
import { logger } from "@omniflow/common";

export function buildChangeMemberAccessProducer(producer: Producer) {
    return async (data: {
        userName: string;
        projectId: string;
        access: IAccess;
    }) => {
        logger.debug(`producer: change-member-access`);
        await producer.send({
            topic: "change-member-access",
            messages: [{ value: JSON.stringify(data) }],
        });
    };
}
