import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    UnauthorizedError,
    UserNotFoundError,
    UserUnauthorizedError,
} from "@omniflow/common";
import { IUserRepository } from "../../interfaces/repository.interface.js";

export default function buildGetProfileController({
    userRepository,
}: {
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        const username = req.params.username;
        if (!username) throw new BadRequestError();
        if (currentUser.username !== username) throw new UnauthorizedError();

        const userData = await userRepository.findByUsername(username);
        if (!userData) throw new UserNotFoundError();

        const response = new ResponseCreator();
        return response.setData(userData).setStatusCode(200);
    };
}
