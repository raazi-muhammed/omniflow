import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    UnauthorizedError,
    validateBody,
} from "@omniflow/common";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildChangePasswordController({
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

        validateBody(userInput, ["currentPassword", "newPassword"]);

        await userUseCases.changePassword({
            username: currentUser.username,
            newPassword: userInput.newPassword,
            currentPassword: userInput.currentPassword,
        });

        const response = new ResponseCreator();
        return response.setMessage("Password changed");
    };
}
