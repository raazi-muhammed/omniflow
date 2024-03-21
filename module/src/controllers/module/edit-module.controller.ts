import {
    BadRequestError,
    IRequest,
    ResponseCreator,
    validateBody,
} from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildEditModuleController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const { currentProject } = req;
        const moduleId = req.params.moduleId;
        if (!moduleId) throw new BadRequestError("Invalid module id");
        const data = req.body;
        validateBody(data, [
            "name",
            "priority",
            "startDate",
            "dueDate",
            "description",
            "dependencies",
        ]);

        await moduleUseCases.editModule({
            id: moduleId,
            moduleData: {
                ...data,
                projectId: currentProject.id,
            },
        });

        const response = new ResponseCreator();
        return response.setMessage("Module updated");
    };
}
