import { IRequest, ResponseCreator } from "@omniflow/common";
import { IEndpointUseCases } from "../../interfaces/use-cases.interface.js";

export default function getEndpointController({
    endpointUseCases,
}: {
    endpointUseCases: IEndpointUseCases;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        const endpointData = await endpointUseCases.getEndpoint({
            endpointId,
        });

        const response = new ResponseCreator();
        return response.setData(endpointData);
    };
}
