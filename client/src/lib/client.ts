import axios from "axios";

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

    async get(url: string, { params = {} }) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "GET",
            withCredentials: true,
            params,
        })
            .then((res) => res.data)
            .catch((err) => err.response.data);
    }

    async delete(url: string, { params = {} }) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "DELETE",
            withCredentials: true,
            params,
        })
            .then((res) => res.data)
            .catch((err) => err.response.data);
    }

    async post(
        url: string,
        { data, params = {} }: { data: Object; params?: Object }
    ) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "POST",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => res.data)
            .catch((err) => err.response.data);
    }
    async patch(url: string, { data = {}, params = {} }) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "PATCH",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => res.data)
            .catch((err) => err.response.data);
    }
    async put(url: string, { data = {}, params = {} }) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "PUT",
            withCredentials: true,
            data,
            params,
        })
            .then((res) => res.data)
            .catch((err) => err.response.data);
    }
}
