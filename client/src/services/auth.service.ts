import axios from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function userLogin(values: {
    email: string;
    password: string;
}): Promise<IResponse> {
    const url = new BuildUrl().user("/login");
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function userSignUp(values: {
    email: string;
    password: string;
}): Promise<IResponse> {
    const url = new BuildUrl().user("/sign-up");
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function verifyUser(values: {
    code: number;
    email: string;
}): Promise<IResponse> {
    const url = new BuildUrl().user("/sign-up/verify-user");
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function resendCode(values: {
    email: string;
}): Promise<IResponse> {
    const url = new BuildUrl().user("/sign-up/verify-user/resend-code");
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function userLogOut(): Promise<IResponse> {
    const url = new BuildUrl().user("/logout");
    return new Promise((resolve, reject) => {
        axios
            .post(url, {}, { withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}
