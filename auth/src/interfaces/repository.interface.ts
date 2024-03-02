import { IDBUser } from "../repository/user.model.js";
import { IUser } from "./entity.interface.js";

type IUserRepository = {
    add: (data: IUser) => Promise<IDBUser>;
    findByEmail: (email: string) => Promise<IDBUser>;
    findByUsername: (username: string) => Promise<IDBUser>;
};

export default IUserRepository;
