import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { ISchemaItem } from "../../../interfaces/entity.interface.js";

export function schemaModel(sequelize: Sequelize) {
    const SchemaModel: ModelDefined<IDBSchemaItem, ISchemaItem> =
        sequelize.define(
            "Schema",
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                endpointId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                key: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                options: {
                    type: DataTypes.ARRAY(DataTypes.STRING),
                },
            },
            {
                timestamps: true,
                paranoid: true,
            }
        );

    // sequelize.sync({ alter: true });
    return SchemaModel;
}

export type IDBSchemaItem = ISchemaItem & {
    id: string;
};
