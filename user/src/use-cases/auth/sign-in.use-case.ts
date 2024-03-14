import { AnErrorOccurredError, ConflictError } from "@omniflow/common";
import {
    IUser,
    IUserEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IGenerateVerificationCode } from "../../interfaces/lib.interface.js";
import IPasswordHash from "../../interfaces/password-hash.interface.js";
import {
    IUserRepository,
    IVerificationCodeRepository,
} from "../../interfaces/repository.interface.js";
import { IMailService } from "../../lib/send-verification-mail.js";

export default function buildSignInUseCase({
    userRepository,
    passwordHash,
    mailService,
    generateCode,
    verificationCodeRepository,
    UserEntity,
}: {
    userRepository: IUserRepository;
    passwordHash: IPasswordHash;
    mailService: IMailService;
    generateCode: IGenerateVerificationCode;
    verificationCodeRepository: IVerificationCodeRepository;
    UserEntity: IUserEntityConstructor;
}) {
    return async (userData: IUser) => {
        const userEntity = new UserEntity(userData);
        userEntity.validate();
        const user = userEntity.get();

        const userWithSameMail = await userRepository.findByEmail(user.email);
        if (userWithSameMail) {
            throw new ConflictError("Email already registered");
        }

        const userWithSameUsername = await userRepository.findByUsername(
            user.username
        );
        if (userWithSameUsername) {
            throw new ConflictError("Username already registered");
        }

        const hashedPassword = await passwordHash.hash(user.password);
        if (!hashedPassword) throw new AnErrorOccurredError();

        const isUserCreated = await userRepository.add({
            ...user,
            password: hashedPassword,
        });
        if (!isUserCreated) throw new AnErrorOccurredError();

        const generatedCode = generateCode();

        const verificationCode = await verificationCodeRepository.upsert({
            code: generatedCode,
            userId: isUserCreated.id,
        });

        if (!verificationCode) {
            throw new AnErrorOccurredError();
        }

        await mailService.sendVerificationCodeMail({
            email: user.email,
            code: verificationCode.code,
            name: user.name,
        });

        return user;
    };
}
