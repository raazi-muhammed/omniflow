import { IRequest, ResponseCreator } from "@omniflow/common";
import { IEndpointUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveEndpointController({
    endpointUseCases,
}: {
    endpointUseCases: IEndpointUseCases;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        await endpointUseCases.removeEndpoint({ id: endpointId });

        const response = new ResponseCreator();
        return response.setMessage("Endpoint removed");
    };
}
