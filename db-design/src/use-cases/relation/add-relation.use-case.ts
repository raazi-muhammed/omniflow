import { ConflictError } from "@omniflow/common";
import { IRelation } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { IDBRelation } from "../../repository/sql/models/relations.model.js";

export default function buildAddRelationUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async (relationData: IRelation) => {
        const alreadyExists = await databaseRepository.getRelation(
            relationData
        );
        const reverseAlreadyExists = await databaseRepository.getRelation({
            ...relationData,
            from: relationData.to,
            to: relationData.from,
        });

        if (alreadyExists || reverseAlreadyExists)
            throw new ConflictError("Relation already exists");

        const relation = await databaseRepository.addRelation(relationData);
        return relation as IDBRelation;
    };
}
