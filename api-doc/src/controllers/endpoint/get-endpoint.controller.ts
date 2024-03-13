import { IRequest, NotFoundError, ResponseCreator } from "@omniflow/common";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function getEndpointController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endpointId = req.params.id;
        const currentProject = req.currentProject;

        const endpointData = await endPointsRepository.getEndpoint({
            projectId: currentProject.id,
            endpointId,
        });

        if (!endpointData) throw new NotFoundError("Endpoint not found");

        const response = new ResponseCreator();
        return response.setData(endpointData);
    };
}
