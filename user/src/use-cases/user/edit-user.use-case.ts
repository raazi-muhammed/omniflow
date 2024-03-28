import {
    AnErrorOccurredError,
    IFile,
    UserNotFoundError,
} from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";
import { IUploadImage } from "../../interfaces/lib.interface.js";
import _ from "lodash";
import { IUserProducers } from "../../interfaces/broker.interface.js";

export default function buildEditProfileUseCase({
    userRepository,
    imageUpload,
    userProducers,
}: {
    userRepository: IUserRepository;
    imageUpload: IUploadImage;
    userProducers: IUserProducers;
}) {
    return async ({
        email,
        imageInput,
        name,
    }: {
        email: string;
        name: string;
        imageInput: Express.Multer.File & IFile;
    }) => {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        let avatar = user.avatar;

        if (!_.isNil(imageInput)) {
            avatar = await imageUpload({
                mimetype: imageInput.mimetype,
                imageBuffer: imageInput.buffer,
            });
        }

        const updatedUser = await userRepository.editUser({
            userId: user.id,
            name,
            avatar,
        });
        if (!updatedUser) throw new AnErrorOccurredError();

        await userProducers.editUser({
            name,
            avatar,
            email: updatedUser.email,
            username: updatedUser.username,
        });

        return updatedUser;
    };
}
