import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    UserNotFoundError,
} from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildGetPublicUserController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const userEmail = req.params.email;
        if (!userEmail || typeof userEmail !== "string") {
            throw new BadRequestError("Invalid email");
        }

        const userDetails = await userRepository.findByEmail(userEmail);
        if (!userDetails) throw new UserNotFoundError();

        const detailsToShow = {
            email: userDetails.email,
            username: userDetails.username,
            avatar: userDetails.avatar,
            name: userDetails.name,
        };

        const response = new ResponseCreator();
        return response.setData(detailsToShow);
    };
}
