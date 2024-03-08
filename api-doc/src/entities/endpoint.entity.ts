import { BadRequestError, ErrorHandler } from "@omniflow/common";
import { IEndpoint, IEndpointEntity } from "../interfaces/entity.interface.js";

export default class Endpoint implements IEndpointEntity {
    name: string;
    route?: string;
    method: string;
    summary: string;
    projectId: string;

    constructor(data: IEndpoint) {
        this.name = data.name;
        this.route = data.route;
        this.method = data.method;
        this.summary = data.summary;
        this.projectId = data.projectId;
    }

    validate() {
        if (!this.route) {
            throw new BadRequestError("Invalid route");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            route: this.route,
            method: this.method,
            summary: this.summary,
            projectId: this.projectId,
        });
    }
}
