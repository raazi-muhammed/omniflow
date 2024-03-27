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

    getEndpoints({ parentFolder }: { parentFolder?: string }) {
        this.url = new BuildUrl().apiDoc(
            `/endpoints?parentFolder=${parentFolder}`
        );
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

    getFolders({ parentFolder }: { parentFolder?: string }) {
        this.url = new BuildUrl().apiDoc(
            `/folders?parentFolder=${parentFolder}`
        );
        this.axiosGet();
        return this;
    }
    getFolderList() {
        this.url = new BuildUrl().apiDoc(`/folders/list`);
        this.axiosGet();
        return this;
    }
}
