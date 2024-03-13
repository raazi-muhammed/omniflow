import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointVariableController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const variableId = req.params.variableId;
        if (!variableId) throw new BadRequestError();

        const isUpdated = await endPointsRepository.removeEndpointVariable(
            variableId
        );
        if (!isUpdated) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
