import {
    IAccess,
    IMember,
    IMemberEntity,
} from "../interfaces/entity.interface.js";

export default class Member implements IMemberEntity {
    name: string;
    username: string;
    email: string;
    avatar?: string;
    access: IAccess;

    constructor(data: IMember) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.avatar = data.avatar;
        this.access = data.access;
    }

    get() {
        return Object.freeze({
            name: this.name,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
            access: this.access,
        });
    }
}
