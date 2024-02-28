export interface IUser {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

class UserEntityClass {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;

    constructor(data: IUser) {}
    validate: () => void;
    get: () => IUser;
}

export type IUserEntity = typeof UserEntityClass;
