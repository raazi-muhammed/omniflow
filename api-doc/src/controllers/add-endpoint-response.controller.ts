import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointRequest } from "../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildAddEndpointResponse({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;
        const inputData = req.body;
        validateBody(inputData, ["statusCode"]);

        const requestToAdd: IEndpointRequest = {
            endpointId,
            statusCode: Number(inputData.statusCode),
            description: inputData?.description,
            body: inputData?.body,
        };

        await endPointsRepository.addEndpointRequest(requestToAdd);

        const response = new ResponseCreator();
        return response;
    };
}
