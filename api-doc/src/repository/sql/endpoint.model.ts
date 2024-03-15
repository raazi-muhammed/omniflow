import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IEndpoint } from "../../interfaces/entity.interface.js";

export function endpointModel(sequelize: Sequelize) {
    const EndpointModel: ModelDefined<IDBEndpoint, IEndpoint> =
        sequelize.define(
            "Endpoint",
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
                route: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                method: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                summary: {
                    type: DataTypes.STRING,
                },
                body: {
                    type: DataTypes.TEXT,
                },
                projectId: {
                    type: DataTypes.STRING,
                },
            },
            {
                timestamps: true,
                paranoid: true,
            }
        );

    //sequelize.sync({ alter: true });
    return EndpointModel;
}

export type IDBEndpoint = IEndpoint & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
