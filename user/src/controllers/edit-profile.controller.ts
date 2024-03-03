import {
    AnErrorOccurredError,
    IRequest,
    ResponseCreator,
    UserNotFoundError,
    UserUnauthorizedError,
    validateBody,
} from "@omniflow/common";
import { IUserRepository } from "../interfaces/repository.interface.js";
import { IUploadImage } from "../interfaces/lib.interface.js";

export default function buildEditProfileController({
    userRepository,
    imageUpload,
}: {
    userRepository: IUserRepository;
    imageUpload: IUploadImage;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new UserUnauthorizedError();
        const userInput = req.body;
        const imageInput = req.file;
        validateBody(userInput, ["name"]);

        const user = await userRepository.findByEmail(currentUser.email);
        if (!user) throw new UserNotFoundError();

        let avatar = null;
        if (imageInput) {
            avatar = await imageUpload({
                mimetype: imageInput.mimetype,
                imageBuffer: imageInput.buffer,
            });
        }

        const updatedUser = await userRepository.editUser({
            userId: user._id,
            name: userInput.name,
            avatar,
        });

        if (!updatedUser) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setMessage("User edited").setData(updatedUser);
    };
}
