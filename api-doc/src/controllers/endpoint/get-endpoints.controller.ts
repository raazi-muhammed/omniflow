import { IRequest, ResponseCreator } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildGetEndpointsController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const endpoints = await endPointsRepository.getEndpoints({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(endpoints);
    };
}
