import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { IVariable } from "../interfaces/entity.interface.js";

export default function buildRemoveEndpointVariableController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        const variableId = req.params.variableId;

        console.log({ variableId });

        const data = await endPointsRepository.removeEndpointVariable(
            variableId
        );

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
