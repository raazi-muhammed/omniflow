import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";

export default function buildResendCodeUpController({
    authUseCases,
}: {
    authUseCases: IAuthUseCase;
}) {
    return async (req: IRequest) => {
        const userBody = req.body;
        validateBody(userBody, ["email"]);

        await authUseCases.resendCode({ email: userBody.email });

        const response = new ResponseCreator();
        return response.setMessage("Mail sent").setStatusCode(201);
    };
}
