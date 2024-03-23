import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { IDBRelation } from "../../repository/sql/models/relations.model.js";

export default function buildGetRelationsUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async ({ projectId }: { projectId: string }) => {
        const relations = await databaseRepository.getRelations({ projectId });
        return relations as IDBRelation[];
    };
}
