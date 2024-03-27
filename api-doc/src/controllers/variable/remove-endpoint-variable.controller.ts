import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IVariableUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildRemoveEndpointVariableController({
    variableUseCases,
}: {
    variableUseCases: IVariableUseCases;
}) {
    return async (req: IRequest) => {
        const variableId = req.params.variableId;
        if (!variableId) throw new BadRequestError();

        await variableUseCases.removeVariable({
            id: variableId,
        });

        const response = new ResponseCreator();
        return response.setData(req.body).setStatusCode(204);
    };
}
