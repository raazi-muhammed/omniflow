import { BadRequestError } from "@omniflow/common";
import { IEndpointResponse } from "../interfaces/entity.interface.js";

export default class EndpointResponse implements IEndpointResponse {
    statusCode: number;
    description?: string;
    endpointId: string;
    type: string;
    body?: string;

    constructor(data: IEndpointResponse) {
        this.endpointId = data.endpointId;
        this.statusCode = data.statusCode;
        this.type = data.type;
        this.description = data.description;
        this.body = data.body;
    }

    validate() {
        if (!this.statusCode) throw new BadRequestError("Invalid status code");
        if (!this.endpointId) throw new BadRequestError("Invalid endpoint");
    }

    get() {
        return Object.freeze({
            statusCode: this.statusCode,
            description: this.description,
            endpointId: this.endpointId,
            type: this.type,
            body: this.body,
        });
    }
}
