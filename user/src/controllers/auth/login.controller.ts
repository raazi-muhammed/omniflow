import { IUserRepository } from "../../interfaces/repository.interface.js";
import {
    IRequest,
    validateBody,
    IToken,
    UserNotFoundError,
    UnauthorizedError,
} from "@omniflow/common";
import IPasswordHash from "../../interfaces/password-hash.interface.js";
import { ResponseCreator } from "@omniflow/common";
import { IUser } from "../../interfaces/entity.interface.js";
import { TOKEN_COOKIE_NAME } from "../../lib/constants.js";

type InputData = {
    email: string;
    password: string;
};

export default function buildLoginController({
    userRepository,
    passwordHash,
    token,
}: {
    userRepository: IUserRepository;
    passwordHash: IPasswordHash;
    token: IToken<IUser>;
}) {
    return async (req: IRequest) => {
        const inputData: InputData = req.body;
        validateBody(inputData, ["email", "password"]);

        const userFound = await userRepository.findByEmail(inputData.email);
        if (!userFound) throw new UserNotFoundError();

        const doesPasswordMatch = await passwordHash.compare(
            inputData.password,
            userFound.password
        );

        if (!doesPasswordMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        if (!userFound.isVerified) {
            throw new UnauthorizedError("User is not verified");
        }

        const userToken = token.sign(userFound);

        const response = new ResponseCreator();
        return response
            .setData(userFound)
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=${userToken}; Path=/`,
            })
            .setStatusCode(200)
            .setMessage("Login successful");
    };
}
