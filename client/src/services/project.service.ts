import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function getProjects(
    config: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().project("/get-projects");
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

export async function addProject(
    values: {
        title: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        projectLead: string;
        description: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().project("/add-project");
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

export async function getProject(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().project(`/get-project/${id}`);
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
