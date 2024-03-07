import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";
import "./interceptor";

export async function getUserProfile(
    username: string,
    config: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user(`/users/${username}`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function editUserProfile(
    username: string,
    data: FormData,
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user(`/users/${username}`);
    return new Promise((resolve, reject) => {
        axios
            .put(url, data, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getCurrentUser(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user("/users/current");
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getPublicUser(
    { email }: { email: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user(`/users/public/${email}`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function changePassword(
    username: string,
    values: {
        currentPassword: string;
        newPassword: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user(`/users/${username}/change-password`);
    return new Promise((resolve, reject) => {
        axios
            .patch(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}
