import { AnErrorOccurredError } from "@omniflow/common";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildChangeTablePosition({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async (data: { tableId: string; x: number; y: number }) => {
        const updated = await databaseRepository.changeTablePosition(data);
        if (!updated) throw new AnErrorOccurredError();
    };
}
