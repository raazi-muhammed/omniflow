import { BadRequestError } from "@omniflow/common";
import { IUser, IUserEntity } from "../interfaces/entity.interface.js";
import { z } from "zod";

export default class User implements IUserEntity {
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
        this.avatar = data?.avatar;
    }

    validate() {
        if (this.password.length < 7) {
            throw new BadRequestError(
                "Password should be great than 7 characters"
            );
        }
        try {
            z.string().email().parse(this.email);
        } catch (error) {
            throw new BadRequestError("Invalid email");
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
