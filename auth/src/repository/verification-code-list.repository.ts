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
        upsert: async ({ code, user }) => {
            const data = await database.findOneAndUpdate(
                { user: user },
                {
                    user,
                    code,
                },
                { upsert: true, new: true }
            );
            console.log({ data });

            return data as IDBVerificationCode;
        },
        find: async ({ user }) => {
            return (await database.findOne({ user })) as IDBVerificationCode;
        },
    });
}
