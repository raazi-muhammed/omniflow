import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function getUserProfile(
    config: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user("/users/:id");
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
    data: FormData,
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user("/users/:id");
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
    values: {
        currentPassword: string;
        newPassword: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().user(`/users/change-password`);
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
