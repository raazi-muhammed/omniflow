import { AnErrorOccurredError } from "@omniflow/common";
import {
    IModule,
    IModuleEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildEditModuleUseCase({
    moduleRepository,
    ModuleCreator,
}: {
    ModuleCreator: IModuleEntityConstructor;
    moduleRepository: IModuleRepository;
}) {
    return async ({ moduleData, id }: { id: string; moduleData: IModule }) => {
        const entity = new ModuleCreator(moduleData);
        entity.validate();
        const data = entity.get();

        const updated = await moduleRepository.edit({ id, moduleData: data });
        if (!updated) throw new AnErrorOccurredError();
    };
}
