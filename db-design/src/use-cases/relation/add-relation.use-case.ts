import { IRelation } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { IDBRelation } from "../../repository/sql/models/relations.model.js";

export default function buildAddRelationUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async (relationData: IRelation) => {
        const relation = await databaseRepository.addRelation(relationData);
        return relation as IDBRelation;
    };
}
