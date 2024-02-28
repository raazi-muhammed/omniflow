import { Request } from "express";
import { IUser } from "../interfaces/entity.interface.js";
import { ISignInUseCase } from "../interfaces/use-case.interface.js";
import validateBody from "../lib/body-validator.js";

export default function makeSignInController(signInUseCase: ISignInUseCase) {
    return (req: Request) => {
        const userData: IUser = req.body;
        validateBody(userData, ["username", "email", "password", "name"]);

        return signInUseCase(userData);
    };
}
