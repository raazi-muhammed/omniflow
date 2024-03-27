import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { AnErrorOccurredError } from "@omniflow/common";

export default function buildRemoveEndpointUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ id }: { id: string }) => {
        const endpoint = await endPointsRepository.removeEndpoint(id);
        if (!endpoint) throw new AnErrorOccurredError();
    };
}
