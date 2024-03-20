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
        dueDate?: Date;
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
export async function editMeeting(
    { id }: { id: string },
    values: {
        name: string;
        agenda: string;
        startDate: Date;
        dueDate?: Date;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}`);
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
export async function removeMeeting(
    { id }: { id: string },

    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}`);
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

export async function getMeeting(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}`);
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

export async function addMeetingNotes(
    { id }: { id: string },
    values: {
        notes: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}/notes`);
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

export async function editMeetingNotes(
    { id }: { id: string },
    values: {
        notes: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}/notes`);
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

export async function deleteMeetingNotes(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().communication(`/meetings/${id}/notes`);
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
