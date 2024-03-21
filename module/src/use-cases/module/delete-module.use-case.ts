import { AnErrorOccurredError } from "@omniflow/common";
import { IModuleRepository } from "../../interfaces/repository.interface.js";

export default function buildDeleteModuleUseCase({
    moduleRepository,
}: {
    moduleRepository: IModuleRepository;
}) {
    return async (id: string) => {
        const deleted = await moduleRepository.delete(id);
        if (!deleted) throw new AnErrorOccurredError();
    };
}
