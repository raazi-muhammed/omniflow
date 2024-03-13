import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { ICreateEndpointUseCase } from "../interfaces/use-cases.interface.js";

export default function buildEditEndpointController({
    endPointsRepository,
    createEndpointUseCase,
}: {
    endPointsRepository: IEndpointsRepository;
    createEndpointUseCase: ICreateEndpointUseCase;
}) {
    return async (req: IRequest) => {
        const endPointInput = req.body;
        const endpointId = req.params.id;
        const currentProject = req.currentProject;

        validateBody(endPointInput, ["name", "method", "route"]);

        const endpointData = createEndpointUseCase({
            name: endPointInput.name,
            method: endPointInput.method,
            summary: endPointInput.summary,
            route: endPointInput.route,
            projectId: currentProject.id,
        });

        const endpointFromDb = await endPointsRepository.updateEndpoint({
            id: endpointId,
            newData: endpointData,
        });

        const response = new ResponseCreator();
        return response.setData(endpointFromDb).setMessage("Endpoint created");
    };
}
