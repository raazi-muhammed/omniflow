import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function addModule(
    values: {
        name: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        description: string;
        parentModule?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/modules`);
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getModules(
    { parentModule }: { parentModule?: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/modules?parentModule=${parentModule}`);
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

export async function getModule(
    { moduleId }: { moduleId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/modules/${moduleId}`);
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

export async function getModuleList(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/modules/list`);
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
