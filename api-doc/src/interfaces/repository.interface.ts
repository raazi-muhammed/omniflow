import { IDBEndpoint } from "../repository/endpoint.model.js";
import { IEndpoint } from "./entity.interface.js";

export type IEndpointsRepository = {
    addEndpoint: (data: IEndpoint) => Promise<IDBEndpoint>;
    getEndpoints: (data: { projectId: string }) => Promise<IDBEndpoint[]>;
};
