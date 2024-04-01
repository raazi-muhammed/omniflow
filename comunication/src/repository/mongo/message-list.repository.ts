import { IMessage } from "../../interfaces/entity.interfaces.js";
import { IMessageRepository } from "../../interfaces/repository.interface.js";
import { IDBMessage, IMessageModel } from "./models/message.model.js";

export default function buildMessageRepository({
    database,
}: {
    database: IMessageModel;
}): IMessageRepository {
    return Object.freeze({
        getMessages: async ({ roomId }: { roomId: string }) => {
            return (await database.find({ roomId })) as IDBMessage[];
        },
        addMessage: async (meetingData: IMessage) => {
            return (await database.create(meetingData)) as IDBMessage;
        },
    });
}
