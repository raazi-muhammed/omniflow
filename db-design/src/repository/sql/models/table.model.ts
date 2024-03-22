import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { ITable } from "../../../interfaces/entity.interface.js";

export function tableModel(sequelize: Sequelize) {
    const TableModel: ModelDefined<IDBTable, ITable> = sequelize.define(
        "Table",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            projectId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            x: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
            },
            y: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return TableModel;
}

export type IDBTable = ITable & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
