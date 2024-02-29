import { IResponse } from "../interfaces/response.interface.js";

export default class ExpressReposeCreator {
    private data?: Object | string;
    private statusCode: number = 200;
    private headers?: Object;
    private message?: string;

    setData(data: Object | string) {
        this.data = data;
        return this;
    }

    setHeaders(headers: Object) {
        this.headers = headers;
        return this;
    }

    setMessage(message: string) {
        this.message = message;
        return this;
    }
    setStatusCode(code: number) {
        this.statusCode = code;
        return this;
    }

    getResponse(): IResponse {
        return {
            data: this?.data,
            statusCode: this.statusCode,
            headers: this?.headers,
            message: this?.message,
        };
    }
}
