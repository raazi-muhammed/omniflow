import { IEndpointResponse } from "../../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddEndpointResponseUseCase({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (data: IEndpointResponse) => {
        const header = endPointsRepository.addEndpointResponse(data);
        return header;
    };
}
