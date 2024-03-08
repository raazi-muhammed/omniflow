import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointsRepository } from "../interfaces/repository.interface.js";

export default function buildAddEndpointController({
    endPointsRepository,
}: {
    endPointsRepository: IEndpointsRepository;
}) {
    return async (req: IRequest) => {
        const endPointInput = req.body;
        const currentProject = req.currentProject;

        validateBody(endPointInput, ["name", "method", "route"]);

        const toData = {
            name: endPointInput.name,
            method: endPointInput.method,
            summary: endPointInput.summary,
            route: endPointInput.route,
            projectId: currentProject._id,
        };

        const data = await endPointsRepository.addEndpoint(toData);

        console.log({ data });

        const response = new ResponseCreator();
        return response.setData(data);
    };
}
