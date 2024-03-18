import { IRequest, ResponseCreator } from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetModuleListController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;

        const modules = await moduleUseCases.getModuleList({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(modules);
    };
}
