import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { AnErrorOccurredError } from "@omniflow/common";

export default function buildGetEndpointsUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({
        projectId,
        parentFolder,
    }: {
        projectId: string;
        parentFolder?: string;
    }) => {
        const endpoint = await endPointsRepository.getEndpoints({
            projectId,
            parentFolder,
        });
        if (!endpoint) throw new AnErrorOccurredError();
        return endpoint;
    };
}
