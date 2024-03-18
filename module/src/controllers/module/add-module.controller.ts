import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildAddModuleController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const data = req.body;
        validateBody(data, [
            "name",
            "priority",
            "startDate",
            "dueDate",
            "description",
            "dependencies",
        ]);

        await moduleUseCases.addModule({
            ...data,
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setMessage("Module created");
    };
}
