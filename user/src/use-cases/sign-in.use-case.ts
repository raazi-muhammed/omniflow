import { IUser, IUserEntity } from "../interfaces/entity.interface.js";

export default function buildSignIn(User: IUserEntity) {
    return async (userData: IUser) => {
        const user = new User(userData);
        user.validate();
        return user.get();
    };
}
