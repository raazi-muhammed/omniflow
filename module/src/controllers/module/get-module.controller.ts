import {
    BadRequestError,
    IRequest,
    NotFoundError,
    ResponseCreator,
} from "@omniflow/common";
import { IModuleUseCases } from "../../interfaces/use-case.interface.js";

export default function buildGetModuleController({
    moduleUseCases,
}: {
    moduleUseCases: IModuleUseCases;
}) {
    return async (req: IRequest) => {
        const moduleId = req.params.moduleId;
        if (!moduleId) throw new BadRequestError("Invalid module id");

        const module = await moduleUseCases.getModule({ moduleId });
        if (!module) throw new NotFoundError("Module not found");

        const response = new ResponseCreator();
        return response.setData(module);
    };
}
