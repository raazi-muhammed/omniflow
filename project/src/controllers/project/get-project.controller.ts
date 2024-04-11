import { IRequest, ResponseCreator } from "@omniflow/common";
import { IProjectUseCase } from "../../interfaces/use-case.interface.js";

const TOKEN_COOKIE_NAME_PROJECT = "__omniflow-project-token";

export default function buildGetProjectController({
    projectUseCases,
}: {
    projectUseCases: IProjectUseCase;
}) {
    return async (req: IRequest) => {
        const projectId = req.params.id;
        const currentUser = req.currentUser;

        const { project, token, access } = await projectUseCases.getProject({
            user: currentUser,
            projectId,
        });

        const response = new ResponseCreator();
        return response.setData({ ...project, access }).setHeaders({
            "Set-Cookie": `${TOKEN_COOKIE_NAME_PROJECT}=${token}; Path=/`,
        });
    };
}
