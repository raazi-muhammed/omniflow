import {
    AnErrorOccurredError,
    BadRequestError,
    IRequest,
    ResponseCreator,
} from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildRemoveEndpointSchemaController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const schemaId = req.params.schemaId;
        if (!schemaId) throw new BadRequestError();

        const isUpdated = await endPointsRepository.removeEndpointSchema(
            schemaId
        );
        if (!isUpdated) throw new AnErrorOccurredError();

        const response = new ResponseCreator();
        return response.setData(req.body);
    };
}
