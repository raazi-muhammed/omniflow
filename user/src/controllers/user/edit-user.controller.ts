import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    UnauthorizedError,
    validateBody,
} from "@omniflow/common";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildEditProfileController({
    userUseCases,
}: {
    userUseCases: IUserUseCase;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        const username = req.params.username;
        if (!username) throw new BadRequestError();

        if (currentUser.username !== username) throw new UnauthorizedError();

        const userInput = req.body;
        const imageInput = req.file;
        validateBody(userInput, ["name"]);

        const user = await userUseCases.editProfile({
            email: currentUser.email,
            name: userInput.name,
            imageInput,
        });

        const response = new ResponseCreator();
        return response.setMessage("User edited").setData(user);
    };
}
