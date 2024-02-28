import { IUser } from "../interfaces/entity.interface.js";

export default class User {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;

    constructor(data: IUser) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        if (data.avatar) {
            this.avatar = data.avatar;
        }
    }

    validate() {
        if (this.password.length < 7) {
            throw new Error("Password should be great than 7");
        }
        if (!this.email) {
            throw new Error("Invalid email");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            username: this.name,
            email: this.name,
            avatar: this.name,
            password: this.name,
        });
    }
}
