import { IMessageRepository } from "../../interfaces/repository.interface.js";

export default function buildGetMessagesUseCase({
    messageRepository,
}: {
    messageRepository: IMessageRepository;
}) {
    return async ({ roomId }: { roomId: string }) => {
        const message = await messageRepository.getMessages({ roomId });
        return message;
    };
}
