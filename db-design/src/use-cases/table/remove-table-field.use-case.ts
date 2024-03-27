import { AnErrorOccurredError } from "@omniflow/common";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveTableFieldUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ id }: { id: string }) => {
        const deleted = await databaseRepository.removeTableField({
            fieldId: id,
        });
        if (!deleted) throw new AnErrorOccurredError();
    };
}
