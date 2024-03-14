import { IUser } from "../../interfaces/entity.interface.js";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";
import { validateBody, ResponseCreator, IRequest } from "@omniflow/common";

export default function buildSignInController({
    authUseCases,
}: {
    authUseCases: IAuthUseCase;
}) {
    return async (req: IRequest) => {
        const userData: IUser = req.body;
        validateBody(userData, ["username", "email", "password", "name"]);

        await authUseCases.signIn({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            name: userData.name,
            isVerified: false,
        });

        const response = new ResponseCreator();
        return response
            .setStatusCode(201)
            .setMessage("Please check your mail for verification code");
    };
}
