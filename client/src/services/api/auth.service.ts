import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "../utils";
import "../interceptor";
import { Service } from ".";

export class AuthService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }
    userLogin(values: { email: string; password: string }) {
        this.url = new BuildUrl().user("/login");
        this.axiosPost(values);
        return this;
    }
    userSignUp(values: { email: string; password: string }) {
        this.url = new BuildUrl().user("/sign-up");
        this.axiosPost(values);
        return this;
    }
    verifyUser(values: { code: number; email: string }) {
        this.url = new BuildUrl().user("/sign-up/verify-user");
        this.axiosPost(values);
        return this;
    }
    resendCode(values: { email: string }) {
        this.url = new BuildUrl().user("/sign-up/verify-user/resend-code");
        this.axiosPost(values);
        return this;
    }
    userLogOut() {
        this.url = new BuildUrl().user("/logout");
        this.axiosPost({});
        return this;
    }
}
