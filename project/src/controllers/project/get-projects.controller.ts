import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

export default function buildGetAllProjectsController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const currentUser = req.currentUser;

        const projects = await projectUseCases.getAllProjects({
            userEmail: currentUser.email,
        });

        const response = new ResponseCreator();
        return response.setData(projects);
    };
}
