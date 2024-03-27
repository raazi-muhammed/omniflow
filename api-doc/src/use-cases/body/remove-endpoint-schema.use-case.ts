import { AnErrorOccurredError } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointSchemaUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ schemaId }: { schemaId: string }) => {
        const isUpdated = await endPointsRepository.removeEndpointSchema(
            schemaId
        );
        if (!isUpdated) throw new AnErrorOccurredError();
    };
}
