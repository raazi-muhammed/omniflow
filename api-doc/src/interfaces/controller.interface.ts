import { IRequest, ResponseCreator } from "@omniflow/common";

export type IEndpointController = {
    addEndpoint: (req: IRequest) => Promise<ResponseCreator>;
    getEndpoints: (req: IRequest) => Promise<ResponseCreator>;
    getEndpoint: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointVariable: (req: IRequest) => Promise<ResponseCreator>;
    removeEndpointVariable: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointHeader: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointBody: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointSchema: (req: IRequest) => Promise<ResponseCreator>;
    removeEndpointSchema: (req: IRequest) => Promise<ResponseCreator>;
    addEndpointResponse: (req: IRequest) => Promise<ResponseCreator>;
    removeEndpointHeader: (req: IRequest) => Promise<ResponseCreator>;
    removeEndpointResponse: (req: IRequest) => Promise<ResponseCreator>;
};
