import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IEndpointResponse } from "../../../interfaces/entity.interface.js";

export function endpointResponseModel(sequelize: Sequelize) {
    const EndpointRequestModel: ModelDefined<
        IDBEndpointResponse,
        IEndpointResponse
    > = sequelize.define(
        "EndpointResponse",
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
            statusCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.TEXT,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return EndpointRequestModel;
}

export type IDBEndpointResponse = IEndpointResponse & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
