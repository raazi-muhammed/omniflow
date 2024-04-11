import { BadRequestError } from "@omniflow/common";
import { IEndpoint, IEndpointEntity } from "../interfaces/entity.interface.js";
import { Types } from "mongoose";

export default class Endpoint implements IEndpointEntity {
    name: string;
    route?: string;
    parentFolder?: string;
    body?: string;
    method: string;
    summary: string;
    projectId: string;

    constructor(data: IEndpoint) {
        this.name = data.name;
        this.route = data.route;
        this.method = data.method;
        this.summary = data.summary;
        this.projectId = data.projectId;
        this.parentFolder = data.parentFolder;
        this.body = data.body;
    }

    validate() {
        try {
            new Types.ObjectId(this.projectId);
        } catch (error) {
            throw new BadRequestError("Invalid project");
        }
    }

    get() {
        return Object.freeze({
            name: this.name,
            route: this.route,
            method: this.method,
            summary: this.summary,
            projectId: this.projectId,
            parentFolder: this.parentFolder,
            body: this.body,
        });
    }
}
