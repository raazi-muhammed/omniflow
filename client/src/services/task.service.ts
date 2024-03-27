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
        status: string;
        assignee: Object;
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

export async function deleteTask(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function editTask(
    { id }: { id: string },
    values: {
        name: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        description: string;
        status: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .put(url, values, { ...config, withCredentials: true })
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
export async function getTask(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks/${id}`);
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

export async function changeTaskStatus(
    values: {
        taskId: string;
        status: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().module(`/tasks/${values.taskId}/status`);
    return new Promise((resolve, reject) => {
        axios
            .patch(
                url,
                { status: values.status },
                { ...config, withCredentials: true }
            )
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}
