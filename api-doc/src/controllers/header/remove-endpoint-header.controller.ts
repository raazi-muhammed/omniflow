import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointHeaderController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const headerId = req.params.headerId;
        if (!headerId) throw new BadRequestError();

        const isUpdated = await endPointsRepository.removeEndpointHeader(
            headerId
        );
        if (!isUpdated) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setMessage("Header remove from endpoint");
    };
}
