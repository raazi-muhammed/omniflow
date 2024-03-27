import { AnErrorOccurredError } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointHeaderUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ id }: { id: string }) => {
        const header = endPointsRepository.removeEndpointHeader(id);
        if (!header) throw new AnErrorOccurredError();
    };
}
