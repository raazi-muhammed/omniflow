import { IUserRepository } from "../interfaces/repository.interface.js";
import { IRequest, validateBody, IToken } from "@omniflow/common";
import IPasswordHash from "../interfaces/password-hash.interface.js";
import { ReposeCreator } from "@omniflow/common";
import { IUser } from "../interfaces/entity.interface.js";

const TOKEN_COOKIE_NAME = "__omniflow-user-token";

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

        if (!userFound) throw new Error("User not found");

        const doesPasswordMatch = await passwordHash.compare(
            inputData.password,
            userFound.password
        );
        if (!doesPasswordMatch) throw new Error("Incorrect password");

        if (!userFound.isVerified) throw new Error("Account is not verified");

        const userToken = token.sign(userFound);

        const response = new ReposeCreator();
        return response
            .setData(userFound)
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=${userToken}; Path=/`,
            })
            .setMessage("Login successful");
    };
}
