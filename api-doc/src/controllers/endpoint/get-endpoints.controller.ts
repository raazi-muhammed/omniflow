import { IRequest, ResponseCreator } from "@omniflow/common";
import { IEndpointUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetEndpointsController({
    endpointUseCases,
}: {
    endpointUseCases: IEndpointUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const parentFolder = req.query.parentFolder;

        let endpoints = [];
        if (typeof parentFolder === "string" && parentFolder != "undefined") {
            endpoints = await endpointUseCases.getEndpoints({
                projectId: currentProject.id,
                parentFolder,
            });
        } else {
            endpoints = await endpointUseCases.getEndpoints({
                projectId: currentProject.id,
            });
        }

        const response = new ResponseCreator();
        return response.setData(endpoints);
    };
}
