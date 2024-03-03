import axios, {
    AxiosHeaders,
    AxiosRequestConfig,
    HeadersDefaults,
} from "axios";

export default class API {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "http://";
        return this;
    }

    user() {
        this.baseUrl += "localhost:4000/api/user";
        return this;
    }
    project() {
        this.baseUrl += "localhost:4005/api/project";
        return this;
    }
    team() {
        this.baseUrl += "localhost:4010/api/team";
        return this;
    }

    async get(url: string, { params = {}, headers = {} } = {}) {
        return axios({
            baseURL: this.baseUrl,
            url,
            method: "GET",
            withCredentials: true,
            params,
            headers,
        })
            .then((res) => res.data)
            .catch((err) => err.response?.data);
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
            headers: { "content-type": "multipart/form-data" },
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
