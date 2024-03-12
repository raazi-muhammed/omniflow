import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IEndpointRequest } from "../interfaces/entity.interface.js";

export function endpointRequestModel(sequelize: Sequelize) {
    const EndpointRequestModel: ModelDefined<
        IDBEndpointRequest,
        IEndpointRequest
    > = sequelize.define("EndpointRequest", {
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
        description: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.TEXT,
        },
    });

    return EndpointRequestModel;
}

export type IDBEndpointRequest = IEndpointRequest & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
