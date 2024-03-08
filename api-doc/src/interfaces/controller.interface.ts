import { IRequest, ResponseCreator } from "@omniflow/common";

export type IEndpointController = {
    addEndpoint: (req: IRequest) => Promise<ResponseCreator>;
    getEndpoints: (req: IRequest) => Promise<ResponseCreator>;
};
