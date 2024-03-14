import {
    AnErrorOccurredError,
    IFile,
    UserNotFoundError,
} from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";
import { IUploadImage } from "../../interfaces/lib.interface.js";
import _ from "lodash";

export default function buildEditProfileUseCase({
    userRepository,
    imageUpload,
}: {
    userRepository: IUserRepository;
    imageUpload: IUploadImage;
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

        return updatedUser;
    };
}
