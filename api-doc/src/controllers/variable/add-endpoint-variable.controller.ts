import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IVariableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildEndpointVariableController({
    variableUseCases,
}: {
    variableUseCases: IVariableUseCases;
}) {
    return async (req: IRequest) => {
        const inputData = req.body;
        const endpointId = req.params.id;
        validateBody(inputData, ["name", "type"]);

        const variable = variableUseCases.addVariable({
            name: inputData.name,
            type: inputData.type,
            endpointId,
            description: inputData?.description,
        });

        const response = new ResponseCreator();
        return response
            .setMessage("Variable created")
            .setData(variable)
            .setStatusCode(201);
    };
}
