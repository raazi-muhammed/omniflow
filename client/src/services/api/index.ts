import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponse, adaptErrorResponse, adaptSuccessResponse } from "./utils";

export class Service {
    config: AxiosRequestConfig | undefined;
    url: string = "";
    apiCall?: () => Promise<AxiosResponse<any, any>>;

    constructor(config?: AxiosRequestConfig) {
        this.config = config;
    }

    axiosGet() {
        this.apiCall = () =>
            axios.get(this.url || "", {
                ...this.config,
                withCredentials: true,
            });
    }
    axiosDelete() {
        this.apiCall = () =>
            axios.delete(this.url || "", {
                ...this.config,
                withCredentials: true,
            });
    }
    axiosPost(data: Object) {
        this.apiCall = () =>
            axios.post(this.url, data, {
                ...this.config,
                withCredentials: true,
            });
    }
    axiosPut(data: Object) {
        this.apiCall = () =>
            axios.put(this.url, data, {
                ...this.config,
                withCredentials: true,
            });
    }
    axiosPatch(data: Object) {
        this.apiCall = () =>
            axios.patch(this.url, data, {
                ...this.config,
                withCredentials: true,
            });
    }
    exec(): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            if (!this.apiCall) {
                console.log("invalid api call");
                return;
            }

            this.apiCall()
                .then((response) => {
                    resolve(adaptSuccessResponse(response));
                })
                .catch((error) => {
                    reject(adaptErrorResponse(error));
                });
        });
    }
}
