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
    const url = new BuildUrl().user("/get-profile");
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
    const url = new BuildUrl().user("/edit-profile");
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, { ...config, withCredentials: true })
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
    const url = new BuildUrl().user("/current-user");
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
    const url = new BuildUrl().user(`/get-public-user?email=${email}`);
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
