import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { IVariable } from "../interfaces/entity.interface.js";

export default function buildEndpointVariableController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["name", "type"]);

        const variableToAdd: IVariable = {
            name: inputData.name,
            type: inputData.type,
            endpointId,
            description: inputData?.description,
        };

        const data = await endPointsRepository.addEndpointVariable(
            variableToAdd
        );

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
