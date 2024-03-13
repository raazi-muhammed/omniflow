import { IRequest, IToken, ResponseCreator } from "@omniflow/common";
import { IProjectRepository } from "../../interfaces/repository.interface.js";
import { IProject } from "../../interfaces/entity.interface.js";

const TOKEN_COOKIE_NAME_PROJECT = "__omniflow-project-token";

export default function buildGetCurrentProject({
    token,
    projectRepository,
}: {
    token: IToken<IProject>;
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const projectData = await projectRepository.get(currentProject.id);

        const projectToken = token.sign(projectData);

        const response = new ResponseCreator();
        return response.setData(projectData).setHeaders({
            "Set-Cookie": `${TOKEN_COOKIE_NAME_PROJECT}=${projectToken}; Path=/`,
        });
    };
}
