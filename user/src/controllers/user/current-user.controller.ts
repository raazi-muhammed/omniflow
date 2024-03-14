import { IRequest } from "@omniflow/common";
import { ResponseCreator } from "@omniflow/common";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildCurrentUserController({
    userUseCases,
}: {
    userUseCases: IUserUseCase;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;

        const user = await userUseCases.currentUser({
            username: currentUser.username,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("User logged in")
            .setData(user)
            .setStatusCode(200);
    };
}
