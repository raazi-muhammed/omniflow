import {
    AnErrorOccurredError,
    ErrorHandler,
    IRequest,
    ReposeCreator,
    UserNotFoundError,
    UserUnauthorizedError,
    validateBody,
} from "@omniflow/common";
import { IUserRepository } from "../interfaces/repository.interface.js";

export default function buildEditProfileController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        if (!currentUser) throw new UserUnauthorizedError();

        const userInput = req.body;
        validateBody(userInput, ["name"]);

        const user = await userRepository.findByEmail(currentUser.email);
        if (!user) throw new UserNotFoundError();

        const updatedUser = await userRepository.editUser({
            userId: user._id,
            name: userInput.name,
        });

        if (!updatedUser) throw new AnErrorOccurredError();

        const response = new ReposeCreator();
        return response.setMessage("User edited").setData(updatedUser);
    };
}
