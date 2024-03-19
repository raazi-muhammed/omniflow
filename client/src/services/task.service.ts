import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function addTask(
    values: {
        name: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        description: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks`);
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
export async function getTasks(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks`);
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
