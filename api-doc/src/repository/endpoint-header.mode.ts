import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IHeader } from "../interfaces/entity.interface.js";

export function headerModel(sequelize: Sequelize) {
    const HeaderModel: ModelDefined<IDBHeader, IHeader> = sequelize.define(
        "Headers",
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
            value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
        },
        { timestamps: false }
    );

    // sequelize.sync({ alter: true });
    return HeaderModel;
}

export type IDBHeader = IHeader & {
    id: string;
};
