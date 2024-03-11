import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IVariable } from "../interfaces/entity.interface.js";

export function variableModel(sequelize: Sequelize) {
    const VariableModel: ModelDefined<IDBVariable, IVariable> =
        sequelize.define("Variables", {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            endpointId: {
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
            description: {
                type: DataTypes.STRING,
            },
        });

    // sequelize.sync({ alter: true });
    return VariableModel;
}

export type IDBVariable = IVariable & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
