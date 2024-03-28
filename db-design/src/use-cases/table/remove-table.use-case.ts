import { AnErrorOccurredError } from "@omniflow/common";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveTableUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ tableId }: { tableId: string }) => {
        const deleted = await databaseRepository.removeTable({ id: tableId });

        const fields = await databaseRepository.getTableFields({ tableId });
        fields.map((a) => {
            databaseRepository.removeRelationsByField({
                fieldId: a.id,
            });
        });

        if (!deleted) throw new AnErrorOccurredError();
    };
}
