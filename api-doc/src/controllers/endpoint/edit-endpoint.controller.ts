import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildEditEndpointController({
    endpointUseCases,
}: {
    endpointUseCases: IEndpointUseCases;
}) {
    return async (req: IRequest) => {
        const endPointInput = req.body;
        const endpointId = req.params.id;
        const currentProject = req.currentProject;

        validateBody(endPointInput, ["name", "method", "route"]);

        await endpointUseCases.editEndpoint({
            id: endpointId,
            endpointData: {
                name: endPointInput.name,
                method: endPointInput.method,
                summary: endPointInput.summary,
                route: endPointInput.route,
                projectId: currentProject.id,
            },
        });

        const response = new ResponseCreator();
        return response.setMessage("Endpoint edited");
    };
}
