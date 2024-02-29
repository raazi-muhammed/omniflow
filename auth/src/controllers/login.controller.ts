import { Request } from "express";
import IUserRepository from "../interfaces/repository.interface.js";
import validateBody from "../lib/body-validator.js";
import IPasswordHash from "../interfaces/password-hash.interface.js";
import IToken from "../interfaces/token.interface.js";
import { IResponse } from "../interfaces/response.interface.js";
import ExpressReposeCreator from "../lib/express-response.js";

const TOKEN_COOKIE_NAME = "__omniflow-user-token";

type InputData = {
    username: string;
    password: string;
};

export default function buildLoginController({
    userRepository,
    passwordHash,
    token,
}: {
    userRepository: IUserRepository;
    passwordHash: IPasswordHash;
    token: IToken;
}) {
    return async (req: Request) => {
        const inputData: InputData = req.body;
        validateBody(inputData, ["username", "password"]);
        const userFound = await userRepository.findByUsername(
            inputData.username
        );
        if (!userFound) throw new Error("User not found");

        const doesPasswordMatch = await passwordHash.compare(
            inputData.password,
            userFound.password
        );
        if (!doesPasswordMatch) throw new Error("Incorrect password");

        const userToken = token.sign(userFound);

        const response = new ExpressReposeCreator();
        return response
            .setData(userFound)
            .setHeaders({ "Set-Cookie": `${TOKEN_COOKIE_NAME}=${userToken}` })
            .setMessage("Login successful");
    };
}
