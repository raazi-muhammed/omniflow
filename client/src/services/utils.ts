import { AxiosError, AxiosResponse } from "axios";

export class BuildUrl {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "http://";
        return this;
    }

    user(endpoint: string) {
        const url = "localhost:4000/api/user";
        return this.baseUrl + url + endpoint;
    }
    project(endpoint: string) {
        const url = "localhost:4005/api/project";
        return this.baseUrl + url + endpoint;
    }
    team(endpoint: string) {
        const url = "localhost:4010/api/team";
        return this.baseUrl + url + endpoint;
    }
    apiDoc(endpoint: string) {
        const url = "localhost:4015/api/api-doc";
        return this.baseUrl + url + endpoint;
    }
    module(endpoint: string) {
        const url = "localhost:4020/api/module";
        return this.baseUrl + url + endpoint;
    }
    communication(endpoint: string) {
        const url = "localhost:4025/api/communication";
        return this.baseUrl + url + endpoint;
    }
}

export type IResponse = {
    message: string;
    data?: any;
};

export function adaptSuccessResponse(response: AxiosResponse): IResponse {
    return {
        message: response?.data?.message || "Success",
        data: response?.data?.data,
    };
}
export function adaptErrorResponse(
    error: AxiosError<{ message?: string }>
): string {
    return error?.response?.data?.message || "Error";
}
