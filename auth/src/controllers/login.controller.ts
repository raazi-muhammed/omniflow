import { Request } from "express";
import IUserRepository from "../interfaces/repository.interface.js";
import { IRequest, validateBody } from "@omniflow/common";
import IPasswordHash from "../interfaces/password-hash.interface.js";
import IToken from "../interfaces/token.interface.js";
import { ReposeCreator } from "@omniflow/common";

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
    return async (req: IRequest) => {
        const inputData: InputData = req.body;
        validateBody(inputData, ["username", "password"]);
        const userFound = await userRepository.findByUsername(
            inputData.username
        );
        console.log({ userFound });

        if (!userFound) throw new Error("User not found");

        const doesPasswordMatch = await passwordHash.compare(
            inputData.password,
            userFound.password
        );
        if (!doesPasswordMatch) throw new Error("Incorrect password");

        const userToken = token.sign(userFound);

        const response = new ReposeCreator();
        return response
            .setData(userFound)
            .setHeaders({ "Set-Cookie": `${TOKEN_COOKIE_NAME}=${userToken}` })
            .setMessage("Login successful");
    };
}
