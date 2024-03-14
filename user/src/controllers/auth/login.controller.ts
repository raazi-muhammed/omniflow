import { IRequest, validateBody } from "@omniflow/common";
import { ResponseCreator } from "@omniflow/common";
import { TOKEN_COOKIE_NAME } from "../../lib/constants.js";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";

type InputData = {
    email: string;
    password: string;
};

export default function buildLoginController({
    authUseCases,
}: {
    authUseCases: IAuthUseCase;
}) {
    return async (req: IRequest) => {
        const inputData: InputData = req.body;
        validateBody(inputData, ["email", "password"]);

        const { user, token } = await authUseCases.login({
            email: inputData.email,
            password: inputData.password,
        });

        const response = new ResponseCreator();
        return response
            .setData(user)
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; Path=/`,
            })
            .setStatusCode(200)
            .setMessage("Login successful");
    };
}
