import { IUser } from "../interfaces/entity.interface.js";
import { IUserRepository } from "../interfaces/repository.interface.js";
import { IDBUser, IUserModel } from "./user.model.js";

export default function makeUserRepository({
    database,
}: {
    database: IUserModel;
}): IUserRepository {
    return Object.freeze({
        add: async (userData: IUser) => {
            return (await database.create(userData)) as IDBUser;
        },
        findByEmail: async (email: string) => {
            return (await database.findOne({ email })) as IDBUser;
        },
        findByUsername: async (username: string) => {
            const user = await database.findOne({ username });
            return user as IDBUser;
        },
        verifyUser: async (email: string) => {
            const updated = await database.updateOne(
                { email },
                { isVerified: true }
            );
            return updated.acknowledged;
        },
        editUser: async ({ userId, name, avatar }) => {
            const data = await database.findOneAndUpdate(
                { _id: userId },
                { name, avatar }
            );
            return data as IDBUser;
        },
        changePassword: async ({
            userId,
            newPassword,
        }: {
            userId: string;
            newPassword: string;
        }) => {
            const data = await database.updateOne(
                {
                    _id: userId,
                },
                { password: newPassword }
            );

            return data.modifiedCount > 0;
        },
    });
}
