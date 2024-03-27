import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddEndpointBodyUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async ({
        endpointId,
        body,
    }: {
        endpointId: string;
        body: string;
    }) => {
        await endPointsRepository.addEndpointBody({
            endpointId,
            body,
        });
    };
}
