import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";
import "./interceptor";

export async function addEndpoint(
    values: { name: string; summary: string; route: string; method: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints`);
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

export async function getEndpoints(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints`);
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

export async function getEndpoint(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                console.log(response);

                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function addEndpointVariable(
    { id }: { id: string },
    values: {
        name: string;
        type: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/variables`);
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

export async function addEndpointHeader(
    { id }: { id: string },
    values: {
        key: string;
        value: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/headers`);
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

export async function addEndpointBody(
    { id }: { id: string },
    values: {
        body: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/body`);
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
export async function addEndpointSchema(
    { id }: { id: string },
    values: {
        key: string;
        type: string;
        options: string[];
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/schema`);
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
export async function addEndpointResponse(
    { id }: { id: string },
    values: {
        statusCode: number;
        body?: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/response`);
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
