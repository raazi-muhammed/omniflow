import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { IHeader } from "../interfaces/entity.interface.js";

export default function buildEndpointHeaderController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["key", "value"]);

        const headerToAdd: IHeader = {
            key: inputData.key,
            value: inputData.value,
            endpointId,
            description: inputData?.description,
        };

        const data = await endPointsRepository.addEndpointHeader(headerToAdd);

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
