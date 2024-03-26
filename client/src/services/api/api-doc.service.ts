import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "../utils";
import "../interceptor";
import { Service } from ".";

export class ApiDocService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    addEndpoint(values: {
        name: string;
        summary: string;
        route: string;
        method: string;
    }) {
        this.url = new BuildUrl().apiDoc("/endpoints");
        this.axiosPost(values);
        return this;
    }

    getEndpoints() {
        this.url = new BuildUrl().apiDoc("/endpoints");
        this.axiosGet();
        return this;
    }

    getEndpoint(id: string) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}`);
        this.axiosGet();
        return this;
    }

    editEndpoint(
        id: string,
        values: { name: string; summary: string; route: string; method: string }
    ) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}`);
        this.axiosPut(values);
        return this;
    }

    removeEndpoint(id: string) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}`);
        this.axiosDelete();
        return this;
    }

    addEndpointVariable(
        id: string,
        values: { name: string; type: string; description?: string }
    ) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}/variables`);
        this.axiosPost(values);
        return this;
    }

    removeEndpointVariable(endpointId: string, variableId: string) {
        this.url = new BuildUrl().apiDoc(
            `/endpoints/${endpointId}/variables/${variableId}`
        );
        this.axiosDelete();
        return this;
    }

    addEndpointHeader(
        id: string,
        values: { key: string; value: string; description?: string }
    ) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}/headers`);
        this.axiosPost(values);
        return this;
    }

    removeEndpointHeader(endpointId: string, headerId: string) {
        this.url = new BuildUrl().apiDoc(
            `/endpoints/${endpointId}/headers/${headerId}`
        );
        this.axiosDelete();
        return this;
    }

    addEndpointBody(id: string, values: { body: string }) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}/body`);
        this.axiosPost(values);
        return this;
    }

    addEndpointSchema(
        id: string,
        values: { key: string; type: string; options: string[] }
    ) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}/schema`);
        this.axiosPost(values);
        return this;
    }

    removeEndpointSchema(endpointId: string, schemaId: string) {
        this.url = new BuildUrl().apiDoc(
            `/endpoints/${endpointId}/schema/${schemaId}`
        );
        this.axiosDelete();
        return this;
    }

    addEndpointResponse(
        id: string,
        values: {
            statusCode: number;
            body?: string;
            type: string;
            description?: string;
        }
    ) {
        this.url = new BuildUrl().apiDoc(`/endpoints/${id}/responses`);
        this.axiosPost(values);
        return this;
    }

    removeEndpointResponse(endpointId: string, responseId: string) {
        this.url = new BuildUrl().apiDoc(
            `/endpoints/${endpointId}/responses/${responseId}`
        );
        this.axiosDelete();
        return this;
    }

    addFolder(values: { name: string }) {
        this.url = new BuildUrl().apiDoc(`/folders`);
        this.axiosPost(values);
        return this;
    }

    getFolders() {
        this.url = new BuildUrl().apiDoc(`/folders`);
        this.axiosGet();
        return this;
    }
}

/* export async function addEndpoint(
    values: { name: string; summary: string; route: string; method: string },
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

export async function getEndpoint(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                console.log(response);

                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function editEndpoint(
    { id }: { id: string },
    values: { name: string; summary: string; route: string; method: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .put(url, values, { ...config, withCredentials: true })
            .then((response) => {
                console.log(response);

                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}
export async function removeEndpoint(
    { id }: { id: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}`);
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { ...config, withCredentials: true })
            .then((response) => {
                console.log(response);

                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function addEndpointVariable(
    { id }: { id: string },
    values: {
        name: string;
        type: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/variables`);
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
export async function removeEndpointVariable(
    { endpointId, variableId }: { endpointId: string; variableId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(
        `/endpoints/${endpointId}/variables/${variableId}`
    );
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

export async function addEndpointHeader(
    { id }: { id: string },
    values: {
        key: string;
        value: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/headers`);
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

export async function removeEndpointHeader(
    { endpointId, headerId }: { endpointId: string; headerId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(
        `/endpoints/${endpointId}/headers/${headerId}`
    );
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

export async function addEndpointBody(
    { id }: { id: string },
    values: {
        body: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/body`);
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
export async function addEndpointSchema(
    { id }: { id: string },
    values: {
        key: string;
        type: string;
        options: string[];
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/schema`);
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

export async function removeEndpointSchema(
    { endpointId, schemaId }: { endpointId: string; schemaId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(
        `/endpoints/${endpointId}/schema/${schemaId}`
    );
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

export async function addEndpointResponse(
    { id }: { id: string },
    values: {
        statusCode: number;
        body?: string;
        type: string;
        description?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/endpoints/${id}/responses`);
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

export async function removeEndpointResponse(
    {
        endpointId,
        responseId: responseId,
    }: { endpointId: string; responseId: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(
        `/endpoints/${endpointId}/responses/${responseId}`
    );
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

export async function addFolder(
    values: { name: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/folders`);
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

export async function getFolders(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().apiDoc(`/folders`);
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
 */
