import { AnErrorOccurredError } from "@omniflow/common";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildRemoveRelationUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ relationId }: { relationId: string }) => {
        const deleted = await databaseRepository.removeRelation({
            relationId,
        });
        if (!deleted) throw new AnErrorOccurredError();
    };
}
