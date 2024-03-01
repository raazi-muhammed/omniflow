import { ReposeCreator } from "@omniflow/common";
import { IProjectRepository } from "../interfaces/repository.interface.js";

export default function buildGetAllProjectsController({
    projectRepository,
}: {
    projectRepository: IProjectRepository;
}) {
    return async () => {
        const data = await projectRepository.getAll();

        const response = new ReposeCreator();
        return response.setData(data);
    };
}
