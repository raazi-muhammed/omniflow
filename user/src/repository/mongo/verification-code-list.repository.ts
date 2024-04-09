import { IVerificationCodeRepository } from "../../interfaces/repository.interface.js";
import {
    IDBVerificationCode,
    IVerificationCodeModel,
} from "./models/verification-code.model.js";

export default function makeVerificationCodeRepository({
    database,
}: {
    database: IVerificationCodeModel;
}): IVerificationCodeRepository {
    return Object.freeze({
        upsert: async ({ code, userId }) => {
            const data = await database.findOneAndUpdate(
                { user: userId },
                {
                    user: userId,
                    code,
                },
                { upsert: true, new: true }
            );
            console.log({ data });

            return data as IDBVerificationCode;
        },
        find: async ({ userId }) => {
            return (await database.findOne({
                user: userId,
            })) as IDBVerificationCode;
        },
    });
}
