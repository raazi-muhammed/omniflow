import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
    UnauthorizedError,
    UserNotFoundError,
    validateBody,
} from "@omniflow/common";
import { IUserRepository } from "../interfaces/repository.interface.js";
import IPasswordHash from "../interfaces/password-hash.interface.js";

export default function buildChangePasswordController({
    userRepository,
    passwordHash,
}: {
    passwordHash: IPasswordHash;
    userRepository: IUserRepository;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;
        const username = req.params.username;
        if (!username) throw new BadRequestError();
        if (currentUser.username !== username) throw new UnauthorizedError();

        const userInput = req.body;

        validateBody(userInput, ["currentPassword", "newPassword"]);

        const user = await userRepository.findByUsername(username);
        if (!user) throw new UserNotFoundError();

        const doesPasswordMatch = await passwordHash.compare(
            userInput.currentPassword,
            user.password
        );

        if (!doesPasswordMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        const newPassword = await passwordHash.hash(userInput.newPassword);

        const passwordChanged = await userRepository.changePassword({
            userId: currentUser.id,
            newPassword,
        });
        if (!passwordChanged) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setMessage("Password changed");
    };
}
