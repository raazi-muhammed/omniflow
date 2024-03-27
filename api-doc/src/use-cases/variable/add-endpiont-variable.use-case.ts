import {
    IVariable,
    IVariableEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddEndpointVariableUseCase({
    endPointsRepository,
    Variable,
}: {
    endPointsRepository: IEndpointsRepository;
    Variable: IVariableEntityConstructor;
}) {
    return async (data: IVariable) => {
        const EVariable = new Variable(data);
        EVariable.validate();
        const variableData = EVariable.get();

        const header = endPointsRepository.addEndpointVariable(variableData);
        return header;
    };
}
