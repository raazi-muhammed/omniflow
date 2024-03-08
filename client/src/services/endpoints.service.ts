import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";
import "./interceptor";
import { IEndpoint } from "@/types/database";

export async function addEndpoint(
    values: Omit<IEndpoint, "projectId">,
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
