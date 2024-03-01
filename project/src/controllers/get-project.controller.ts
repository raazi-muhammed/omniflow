import { IRequest, ReposeCreator } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildGetProjectController({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async (req: IRequest) => {
        console.log(req.params, req.query);

        const projectId = req.params?.id;
        if (!projectId) throw new Error("Id not passed");

        const projectData = await projectRepository.get(req.params.id);
        const response = new ReposeCreator();
        return response.setData(projectData);
    };
}
