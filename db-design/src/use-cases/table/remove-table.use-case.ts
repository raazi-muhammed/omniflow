import { AnErrorOccurredError } from "@omniflow/common";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveTableUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ tableId }: { tableId: string }) => {
        const deleted = await databaseRepository.removeTable({ id: tableId });
        if (!deleted) throw new AnErrorOccurredError();
    };
}
