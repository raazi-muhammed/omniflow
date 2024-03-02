import { IVerificationCodeRepository } from "../interfaces/repository.interface.js";
import {
    IDBVerificationCode,
    IVerificationCodeModel,
} from "./verification-code.model.js";

export default function makeVerificationCodeRepository({
    database,
}: {
    database: IVerificationCodeModel;
}): IVerificationCodeRepository {
    return Object.freeze({
        add: async ({ code, user }) => {
            return (await database.create({
                user,
                code,
            })) as IDBVerificationCode;
        },
        find: async ({ user }) => {
            return (await database.findOne({ user })) as IDBVerificationCode;
        },
    });
}
