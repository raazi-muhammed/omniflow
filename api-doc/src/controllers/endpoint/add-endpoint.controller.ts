import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IEndpointUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddEndpointController({
    endpointUseCases,
}: {
    endpointUseCases: IEndpointUseCases;
}) {
    return async (req: IRequest) => {
        const endPointInput = req.body;
        const currentProject = req.currentProject;

        validateBody(endPointInput, ["name", "method", "route"]);

        const endpoint = endpointUseCases.addEndpoint({
            name: endPointInput.name,
            method: endPointInput.method,
            summary: endPointInput.summary,
            route: endPointInput.route,
            parentFolder: endPointInput.parentFolder
                ? endPointInput.parentFolder
                : null,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response
            .setData(endpoint)
            .setMessage("Endpoint created")
            .setStatusCode(201);
    };
}
