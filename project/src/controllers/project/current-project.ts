import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

const TOKEN_COOKIE_NAME_PROJECT = "__omniflow-project-token";

export default function buildGetCurrentProject({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;
        const currentUser = req.currentUser;

        const { token, project, access } = await projectUseCases.getProject({
            user: currentUser,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData({ ...project, access }).setHeaders({
            "Set-Cookie": `${TOKEN_COOKIE_NAME_PROJECT}=${token}; Path=/`,
        });
    };
}
