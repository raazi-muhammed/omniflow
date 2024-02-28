import axios from "axios";

type Options = {
    toast?: { error: (str: string) => void; success: (str: string) => void };
};

export default class API {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "http://";
        return this;
    }

    auth() {
        this.baseUrl += "localhost:4000/api/auth";
        return this;
    }

    async get(url: string, { params = {} }, options: Options = {}) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "GET",
            withCredentials: true,
            params,
        })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
                if (options?.toast) {
                    options.toast.error(
                        err.response?.data?.message || "Invalid Details"
                    );
                }
            });
    }

    async delete(url: string, { params = {} }, options: Options = {}) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "DELETE",
            withCredentials: true,
            params,
        })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
                if (options?.toast) {
                    options.toast.error(
                        err.response?.data?.message || "Invalid Details"
                    );
                }
            });
    }

    async post(
        url: string,
        { data, params = {} }: { data: Object; params?: Object },
        options: Options = {}
    ) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "POST",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => {
                if (options?.toast) {
                    options.toast.success(res?.data?.message || "Successful");
                }
                return res.data;
            })
            .catch((err) => {
                //console.log(err);
                if (options?.toast) {
                    options.toast.error(
                        err.response?.data?.message || "Invalid Details"
                    );
                }
                return err.response.data;
            });
    }
    async patch(
        url: string,
        { data = {}, params = {} },
        options: Options = {}
    ) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "PATCH",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => {
                if (options?.toast) {
                    options.toast.success(res?.data?.message || "Successful");
                }
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                if (options?.toast) {
                    options.toast.error(
                        err.response?.data?.message || "Invalid Details"
                    );
                }
                return err.response.data;
            });
    }
    async put(url: string, { data = {}, params = {} }, options: Options = {}) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "PUT",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => {
                if (options?.toast) {
                    options.toast.success(res?.data?.message || "Successful");
                }
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                if (options?.toast) {
                    options.toast.error(
                        err.response?.data?.message || "Invalid Details"
                    );
                }
                return err.response.data;
            });
    }
}
