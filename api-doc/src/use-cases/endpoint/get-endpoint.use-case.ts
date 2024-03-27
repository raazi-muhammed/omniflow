import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { AnErrorOccurredError } from "@omniflow/common";

export default function buildGetEndpointUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ endpointId }: { endpointId: string }) => {
        const endpoint = await endPointsRepository.getEndpointById(endpointId);
        if (!endpoint) throw new AnErrorOccurredError();
        return endpoint;
    };
}
