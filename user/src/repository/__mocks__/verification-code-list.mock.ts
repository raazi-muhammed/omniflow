import { Types } from "mongoose";
import { IDBVerificationCode } from "../mongo/models/verification-code.model.js";
import { jest } from "@jest/globals";
import { IVerificationCode } from "../../interfaces/entity.interface.js";

const sampleVerificationCode: IVerificationCode = {
    user: new Types.ObjectId("55153a8014829a865bbf700d"),
    code: 123456,
    expiresAt: new Date(),
};

export const verificationCodeRepositoryMock = {
    upsert: jest.fn<
        ({
            code,
            userId,
        }: {
            code: string;
            userId: string;
        }) => Promise<IDBVerificationCode>
    >(() => Promise.resolve(sampleVerificationCode as IDBVerificationCode)),
    find: jest
        .fn<
            ({
                userId,
            }: {
                userId: string;
            }) => Promise<IDBVerificationCode | null>
        >()
        .mockImplementation(({ userId }: { userId: string }) => {
            if (userId == sampleVerificationCode.user.toString()) {
                return Promise.resolve(sampleVerificationCode);
            } else return Promise.resolve(null);
        }),
};
