import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointResponseController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const responseId = req.params.responseId;
        if (!responseId) throw new BadRequestError();

        const isUpdated = await endPointsRepository.removeEndpointResponse(
            responseId
        );
        if (!isUpdated) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
