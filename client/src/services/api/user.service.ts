import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "../utils";
import "../interceptor";
import { Service } from ".";

export class UserService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    getUserProfile(username: string) {
        this.url = new BuildUrl().user(`/users/${username}`);
        this.axiosGet();
        return this;
    }

    editUserProfile(username: string, data: FormData) {
        this.url = new BuildUrl().user(`/users/${username}`);
        this.axiosPut(data);
        return this;
    }

    getCurrentUser() {
        this.url = new BuildUrl().user("/users/current");
        this.axiosGet();
        return this;
    }

    getPublicUser(email: string) {
        this.url = new BuildUrl().user(`/users/public/${email}`);
        this.axiosGet();
        return this;
    }

    changePassword(
        username: string,
        values: { currentPassword: string; newPassword: string }
    ) {
        this.url = new BuildUrl().user(`/users/${username}/change-password`);
        this.axiosPatch(values);
        return this;
    }
}
