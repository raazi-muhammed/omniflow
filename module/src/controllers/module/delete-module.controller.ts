import { BadRequestError, IRequest, ResponseCreator } from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildDeleteModuleController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const moduleId = req.params.moduleId;
        if (!moduleId) throw new BadRequestError("Invalid module id");

        await moduleUseCases.deleteModule(moduleId);

        const response = new ResponseCreator();
        return response.setMessage("Module deleted").setStatusCode(204);
    };
}
