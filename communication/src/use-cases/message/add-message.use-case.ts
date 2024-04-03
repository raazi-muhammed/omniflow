import { IMessageRepository } from "../../interfaces/repository.interface.js";
import { IFile } from "@omniflow/common";
import { IUser } from "@omniflow/common/dist/interfaces/entity.interface.js";
import _ from "lodash";
import { IMessage, MessageType } from "../../interfaces/entity.interfaces.js";

type IUploadImage = ({}: {
    mimetype: string;
    imageBuffer: Buffer;
}) => Promise<string>;

export default function buildAddMessageUseCase({
    messageRepository,
    imageUpload,
}: {
    messageRepository: IMessageRepository;
    imageUpload: IUploadImage;
}) {
    return async ({
        imageInput,
        from,
        content,
        roomId,
    }: {
        from: IUser;
        content: string;
        roomId: string;
        imageInput: Express.Multer.File & IFile;
    }) => {
        let data: IMessage = {
            content,
            from,
            roomId,
            type: MessageType.TEXT_ONLY,
        };

        if (!_.isNil(imageInput)) {
            const image = await imageUpload({
                mimetype: imageInput.mimetype,
                imageBuffer: imageInput.buffer,
            });
            data.url = image;
            data.type = MessageType.IMAGE;
        }

        const msg = await messageRepository.addMessage(data);
        return msg;
    };
}
