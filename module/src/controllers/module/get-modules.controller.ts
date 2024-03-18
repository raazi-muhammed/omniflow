import { IRequest, ResponseCreator } from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetModulesController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        let parentModule = req.query.parentModule;

        let modules = [];

        console.log({ parentModule });

        if (typeof parentModule === "string" && parentModule != "undefined") {
            modules = await moduleUseCases.getModules({
                projectId: currentProject.id,
                parentModule,
            });
        } else {
            modules = await moduleUseCases.getModules({
                projectId: currentProject.id,
            });
        }

        const response = new ResponseCreator();
        return response.setData(modules);
    };
}
