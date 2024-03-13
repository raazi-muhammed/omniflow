import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { ICreateVariableUseCase } from "../interfaces/use-cases.interface.js";

export default function buildEndpointVariableController({
    endPointsRepository,
    createVariable,
}: {
    endPointsRepository: IEndpointsRepository;
    createVariable: ICreateVariableUseCase;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["name", "type"]);

        const variableToAdd = createVariable({
            name: inputData.name,
            type: inputData.type,
            endpointId,
            description: inputData?.description,
        });

        await endPointsRepository.addEndpointVariable(variableToAdd);

        const response = new ResponseCreator();
        return response.setMessage("Variable created");
    };
}
