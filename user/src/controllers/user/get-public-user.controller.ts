import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IUserUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetPublicUserController({
    userUseCases,
}: {
    userUseCases: IUserUseCase;
}) {
    return async (req: IRequest) => {
        const userEmail = req.params.email;
        if (!userEmail || typeof userEmail !== "string") {
            throw new BadRequestError("Invalid email");
        }

        const userDetails = await userUseCases.getPublicUser({
            email: userEmail,
        });

        const response = new ResponseCreator();
        return response.setData(userDetails);
    };
}
