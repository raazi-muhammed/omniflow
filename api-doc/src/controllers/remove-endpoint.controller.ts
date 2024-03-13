import {
    AnErrorOccurredError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildRemoveEndpointController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;

        const deleted = await endPointsRepository.removeEndpoint(endpointId);
        if (!deleted) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setMessage("Endpoint removed");
    };
}
