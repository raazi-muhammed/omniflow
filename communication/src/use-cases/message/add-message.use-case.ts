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
        fileInput,
        from,
        content,
        roomId,
    }: {
        from: IUser;
        content: string;
        roomId: string;
        fileInput: Express.Multer.File & IFile;
    }) => {
        let data: IMessage = {
            content,
            from,
            roomId,
            type: MessageType.TEXT_ONLY,
        };

        if (!_.isNil(fileInput)) {
            const image = await imageUpload({
                mimetype: fileInput.mimetype,
                imageBuffer: fileInput.buffer,
            });
            data.file = {
                url: image,
                name: `${fileInput.originalname}`,
            };
            if (fileInput.mimetype.includes("image")) {
                data.type = MessageType.IMAGE;
            } else {
                data.type = MessageType.FILE;
            }
        }

        const msg = await messageRepository.addMessage(data);
        return msg;
    };
}
