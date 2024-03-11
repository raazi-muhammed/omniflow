import { IRequest, ResponseCreator } from "@omniflow/common";

export type IEndpointController = {
    addEndpoint: (req: IRequest) => Promise<ResponseCreator>;
    getEndpoints: (req: IRequest) => Promise<ResponseCreator>;
    getEndpoint: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointVariable: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointHeader: (req: IRequest) => Promise<ResponseCreator>;
};
