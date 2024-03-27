import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function addTable(
    values: {
        name: string;
        description: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/tables`);
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

export async function getTables(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/tables`);
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

export async function removeTable(
    { tableId }: { tableId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/tables/${tableId}`);
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
export async function getTable(
    { tableId }: { tableId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/tables/${tableId}`);
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

export async function addTableField(
    { tableId }: { tableId: string },
    values: {
        name: string;
        description: string;
        type: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/tables/${tableId}/fields`);
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

export async function addRelation(
    values: {
        to: string;
        from: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/relations`);
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
export async function getRelations(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/relations`);
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

export async function removeRelations(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().dbDesign(`/relations/${id}`);
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
