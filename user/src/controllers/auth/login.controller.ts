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

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        // Convert the expiration date to UTC string format
        const expires = expirationDate.toUTCString();

        const response = new ResponseCreator();
        return response
            .setData(user)
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; Path=/; Expires=${expires}; HttpOnly`,
            })
            .setStatusCode(200)
            .setMessage("Login successful");
    };
}
