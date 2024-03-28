import { logger } from "@omniflow/common";
import { Producer } from "kafkajs";

export function buildEditUserProducer(producer: Producer) {
    return async (userData: {
        avatar?: string;
        username: string;
        name: string;
    }) => {
        logger.debug(`producer: edit-user`);
        await producer.send({
            topic: "edit-user",
            messages: [{ value: JSON.stringify(userData) }],
        });
    };
}
