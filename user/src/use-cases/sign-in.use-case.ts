import {
    IUser,
    IUserEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildSignIn(User: IUserEntityConstructor) {
    return async (userData: IUser) => {
        const user = new User(userData);
        user.validate();
        return user.get();
    };
}
