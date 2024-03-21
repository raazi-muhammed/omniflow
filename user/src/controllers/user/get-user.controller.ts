import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    UnauthorizedError,
} from "@omniflow/common";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetProfileController({
    userUseCases,
}: {
    userUseCases: IUserUseCase;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        const username = req.params.username;
        if (!username) throw new BadRequestError();
        if (currentUser.username !== username) throw new UnauthorizedError();

        const userData = await userUseCases.getProfile({
            username: currentUser.username,
        });

        const response = new ResponseCreator();
        return response.setData(userData).setStatusCode(200);
    };
}
