export type IResponse = {
    message?: string;
    statusCode?: number;
    headers?: Object;
    data?: Object | string;
};

class ResponseCreatorClass {
    data: Object | string;
    statusCode?: number;
    headers?: Object;
    message?: string;

    ResponseCreatorClass: () => IResponseCreator;
    setData: (data: Object | string) => IResponseCreator;
    setHeaders: (headers: Object) => IResponseCreator;
    setMessage: (message: string) => IResponseCreator;
    setStatusCode: (code: number) => IResponseCreator;
    getResponse: () => IResponse;
}

export type IResponseCreator = typeof ResponseCreatorClass;
