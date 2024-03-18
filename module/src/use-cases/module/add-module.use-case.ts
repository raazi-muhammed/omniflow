import {
    IModule,
    IModuleEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildAddModuleUseCase({
    moduleRepository,
    ModuleCreator,
}: {
    ModuleCreator: IModuleEntityConstructor;
    moduleRepository: IModuleRepository;
}) {
    return async (moduleData: IModule) => {
        const entity = new ModuleCreator(moduleData);
        entity.validate();
        const data = entity.get();

        const module = await moduleRepository.add(data);
        return module;
    };
}
