import { IUser } from "./entity.interface.js";

type IUserRepository = {
    add: (data: IUser) => Promise<boolean>;
    findByEmail: (email: string) => Promise<IUser>;
    findByUsername: (username: string) => Promise<IUser>;
};

export default IUserRepository;
