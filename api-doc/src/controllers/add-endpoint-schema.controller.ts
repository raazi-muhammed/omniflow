import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildAddEndpointSchemaController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        const response = new ResponseCreator();
        const inputData = req.body;
        validateBody(inputData, ["key", "type", "options"]);

        await endPointsRepository.addEndpointSchema({
            key: inputData.key,
            type: inputData.type,
            endpointId,
            options: inputData.options,
        });

        return response;
    };
}
