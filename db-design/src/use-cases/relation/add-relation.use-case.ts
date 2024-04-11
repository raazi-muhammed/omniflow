import { ConflictError } from "@omniflow/common";
import {
    IRelation,
    IRelationEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { IDBRelation } from "../../repository/sql/models/relations.model.js";

export default function buildAddRelationUseCase({
    databaseRepository,
    Relation,
}: {
    databaseRepository: IDatabaseRepository;
    Relation: IRelationEntityConstructor;
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

        if (alreadyExists || reverseAlreadyExists) {
            throw new ConflictError("Relation already exists");
        }

        const relationEntity = new Relation(relationData);
        relationEntity.validate();
        const dataToAdd = relationEntity.get();

        const relation = await databaseRepository.addRelation(dataToAdd);
        return relation as IDBRelation;
    };
}
