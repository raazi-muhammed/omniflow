import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function addMeeting(
    values: {
        name: string;
        agenda: string;
        startDate: Date;
        dueDate: Date;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings`);
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

export async function getMeetings(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings`);
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
