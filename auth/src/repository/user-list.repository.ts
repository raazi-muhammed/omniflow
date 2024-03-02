import { IUser } from "../interfaces/entity.interface.js";
import IUserRepository from "../interfaces/repository.interface.js";
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
            return (await database.findOne({ username })) as IDBUser;
        },
    });
}
