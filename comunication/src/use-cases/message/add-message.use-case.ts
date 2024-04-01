import { IMessageRepository } from "../../interfaces/repository.interface.js";
import { IMessage } from "../../interfaces/entity.interfaces.js";

export default function buildAddMessageUseCase({
    messageRepository,
}: {
    messageRepository: IMessageRepository;
}) {
    return async (message: IMessage) => {
        const msg = await messageRepository.addMessage(message);
        console.log(
            await messageRepository.getMessages({ roomId: message.roomId })
        );

        return msg;
    };
}
