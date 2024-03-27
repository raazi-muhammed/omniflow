import { AxiosError, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
const PROJECT_SERVICE_URL = process.env.NEXT_PUBLIC_PROJECT_SERVICE_URL;
const TEAM_SERVICE_URL = process.env.NEXT_PUBLIC_TEAM_SERVICE_URL;
const API_DOC_SERVICE_URL = process.env.NEXT_PUBLIC_API_DOC_SERVICE_URL;
const COMMUNICATION_SERVICE_URL =
    process.env.NEXT_PUBLIC_COMMUNICATION_SERVICE_URL;
const DB_DESIGN_SERVICE_URL = process.env.NEXT_PUBLIC_DB_DESIGN_SERVICE_URL;

export class BuildUrl {
    private baseUrl: string;

    constructor() {
        if (!BASE_URL) throw new Error("Missing Base URL");
        this.baseUrl = BASE_URL;
        return this;
    }

    user(endpoint: string) {
        if (!USER_SERVICE_URL) {
            throw new Error("Missing User Service URL");
        }
        const url = USER_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    project(endpoint: string) {
        if (!PROJECT_SERVICE_URL) {
            throw new Error("Missing Project Service URL");
        }
        const url = PROJECT_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    team(endpoint: string) {
        if (!TEAM_SERVICE_URL) {
            throw new Error("Missing Team Service URL");
        }
        const url = TEAM_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    apiDoc(endpoint: string) {
        if (!API_DOC_SERVICE_URL) {
            throw new Error("Missing API Doc Service URL");
        }
        const url = API_DOC_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    module(endpoint: string) {
        if (!PROJECT_SERVICE_URL) {
            throw new Error("Missing Module Service URL");
        }
        const url = "localhost:4020/api/module";
        return this.baseUrl + url + endpoint;
    }
    communication(endpoint: string) {
        if (!COMMUNICATION_SERVICE_URL) {
            throw new Error("Missing Communication Service URL");
        }
        const url = COMMUNICATION_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    dbDesign(endpoint: string) {
        if (!DB_DESIGN_SERVICE_URL) {
            throw new Error("Missing DB Design Service URL");
        }
        const url = DB_DESIGN_SERVICE_URL;
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
