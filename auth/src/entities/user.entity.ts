import { ErrorHandler } from "@omniflow/common";
import { IUser } from "../interfaces/entity.interface.js";

export default class User {
    name: string;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    avatar?: string;

    constructor(data: IUser) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.isVerified = data.isVerified;
        if (data.avatar) {
            this.avatar = data.avatar;
        }
    }

    validate() {
        if (this.password.length < 7) {
            throw new ErrorHandler(
                "Password should be great than 7 characters",
                400
            );
        }
        if (!this.email) {
            throw new ErrorHandler("Invalid email", 400);
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
            password: this.password,
            isVerified: this.isVerified,
        });
    }
}
