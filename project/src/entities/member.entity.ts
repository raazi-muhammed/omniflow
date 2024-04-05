import { z } from "zod";
import { IMember, IMemberEntity } from "../interfaces/entity.interface.js";
import { BadRequestError } from "@omniflow/common";

const memberSchema = z.object({
    email: z.string().email(),
});

export default class Member implements IMemberEntity {
    name: string;
    username: string;
    email: string;
    avatar?: string;

    constructor(data: IMember) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.avatar = data.avatar;
    }

    validate() {
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
        });
    }
}
