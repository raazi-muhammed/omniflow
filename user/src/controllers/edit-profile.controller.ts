import {
    ErrorHandler,
    IRequest,
    ReposeCreator,
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
        if (!currentUser) throw new ErrorHandler("No user found", 404);

        const userInput = req.body;
        validateBody(userInput, ["name"]);

        const user = await userRepository.findByEmail(currentUser.email);
        if (!user) throw new ErrorHandler("No user found", 404);

        const updatedUser = await userRepository.editUser({
            userId: user._id,
            name: userInput.name,
        });

        if (!updatedUser) throw new ErrorHandler("An error occurred", 500);

        const response = new ReposeCreator();
        return response.setMessage("User edited").setData(updatedUser);
    };
}
