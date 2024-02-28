import { IUser } from "../interfaces/entity.interface.js";
import IUserRepository from "../interfaces/repository.interface.js";

export default function makeUserRepository({ database }): IUserRepository {
    return Object.freeze({
        add: async (userData: IUser) => {
            await database.create(userData);
            return true;
        },
        findByEmail: async (email: string) => {
            return (await database.findOne({ email })) as IUser;
        },
        findByUsername: async (username: string) => {
            return (await database.findOne({ username })) as IUser;
        },
    });
}
