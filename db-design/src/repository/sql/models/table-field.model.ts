import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { ITableField } from "../../../interfaces/entity.interface.js";

export function tableFieldModel(sequelize: Sequelize) {
    const TableFieldModel: ModelDefined<IDBTableField, ITableField> =
        sequelize.define(
            "TableField",
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                tableId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                options: {
                    type: DataTypes.ARRAY(DataTypes.STRING),
                    defaultValue: [],
                },
                description: {
                    type: DataTypes.STRING,
                },
            },
            { timestamps: true, paranoid: true }
        );

    return TableFieldModel;
}

export type IDBTableField = ITableField & {
    id: string;
};
