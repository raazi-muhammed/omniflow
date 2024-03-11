import { IRequest, ResponseCreator } from "@omniflow/common";

export default function buildAddEndpointSchemaController() {
    return async (req: IRequest) => {
        const response = new ResponseCreator();
        return response;
    };
}
