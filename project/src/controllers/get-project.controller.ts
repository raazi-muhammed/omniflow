import { IRequest, IToken, ResponseCreator } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";
import { IProject } from "../interfaces/entity.interface.js";

const TOKEN_COOKIE_NAME_PROJECT = "__omniflow-project-token";

export default function buildGetProjectController({
    projectRepository,
    token,
}: {
    projectRepository: IProjectRepository;
    token: IToken<IProject>;
}) {
    return async (req: IRequest) => {
        const projectId = req.params?.id;
        if (!projectId) throw new Error("Id not passed");

        const projectData = await projectRepository.get(req.params.id);

        const projectToken = token.sign(projectData);

        const response = new ResponseCreator();
        return response.setData(projectData).setHeaders({
            "Set-Cookie": `${TOKEN_COOKIE_NAME_PROJECT}=${projectToken}; Path=/`,
        });
    };
}
