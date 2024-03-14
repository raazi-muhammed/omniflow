import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";

export default function buildVerifyUserController({
    authUseCases,
}: {
    authUseCases: IAuthUseCase;
}) {
    return async (req: IRequest) => {
        const { email, code } = req.body;
        validateBody(req.body, ["email", "code"]);

        await authUseCases.verifyUser({ email, code });

        const response = new ResponseCreator();
        return response.setMessage("Account verified").setStatusCode(200);
    };
}
