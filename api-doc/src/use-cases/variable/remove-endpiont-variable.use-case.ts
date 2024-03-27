import { AnErrorOccurredError } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveEndpointVariableUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({ id }: { id: string }) => {
        const header = endPointsRepository.removeEndpointVariable(id);
        if (!header) throw new AnErrorOccurredError();
    };
}
