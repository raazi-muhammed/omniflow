import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IRelation } from "../../../interfaces/entity.interface.js";

export function relationModel(sequelize: Sequelize) {
    const RelationModel: ModelDefined<IDBRelation, IRelation> =
        sequelize.define(
            "Relation",
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                projectId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                to: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                from: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            { timestamps: true, paranoid: true }
        );

    return RelationModel;
}

export type IDBRelation = IRelation & {
    id: string;
};
