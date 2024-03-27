import { AnErrorOccurredError } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointResponseUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ id }: { id: string }) => {
        const deleted = endPointsRepository.removeEndpointResponse(id);
        if (!deleted) throw new AnErrorOccurredError();
    };
}
