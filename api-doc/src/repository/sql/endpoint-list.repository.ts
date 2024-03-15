import { ModelDefined, Sequelize } from "sequelize";
import { IDBEndpoint, endpointModel } from "./endpoint.model.js";
import {
    IEndpoint,
    IEndpointResponse,
    IHeader,
    ISchemaItem,
    IVariable,
} from "../../interfaces/entity.interface.js";
import { IDBVariable, variableModel } from "./endpoint-variable.model.js";
import { IDBHeader, headerModel } from "./endpoint-header.mode.js";
import { IDBSchemaItem, schemaModel } from "./endpoint-schema.model.js";
import {
    IDBEndpointResponse,
    endpointResponseModel,
} from "./endpoint-response.model.js";
import { logger } from "@omniflow/common";

export class BuildEndpointRepository {
    client: Sequelize;
    models: {
        Endpoint: ModelDefined<IDBEndpoint, IEndpoint>;
        Variables: ModelDefined<IDBVariable, IVariable>;
        Headers: ModelDefined<IDBHeader, IHeader>;
        Schema: ModelDefined<IDBSchemaItem, ISchemaItem>;
        EndpointResponse: ModelDefined<IDBEndpointResponse, IEndpointResponse>;
    };

    constructor(sequelize: Sequelize) {
        const EndpointModel = endpointModel(sequelize);
        const VariableModel = variableModel(sequelize);
        const HeaderModel = headerModel(sequelize);
        const Schema = schemaModel(sequelize);
        const EndpointResponse = endpointResponseModel(sequelize);

        EndpointModel.hasMany(VariableModel, {
            as: "variables",
            foreignKey: "endpointId",
        });
        VariableModel.belongsTo(EndpointModel, {
            foreignKey: "endpointId",
        });
        EndpointModel.hasMany(HeaderModel, {
            as: "headers",
            foreignKey: "endpointId",
        });
        HeaderModel.belongsTo(EndpointModel, {
            foreignKey: "endpointId",
        });
        EndpointModel.hasMany(Schema, {
            as: "schema",
            foreignKey: "endpointId",
        });
        Schema.belongsTo(EndpointModel, {
            foreignKey: "endpointId",
        });
        EndpointModel.hasMany(EndpointResponse, {
            as: "requests",
            foreignKey: "endpointId",
        });
        EndpointResponse.belongsTo(EndpointModel, {
            foreignKey: "endpointId",
        });

        sequelize
            .sync({ alter: true })
            .then((res) => {
                logger.info("Database sync status\t: Successful");
            })
            .catch((err) => {
                logger.error(err, "Database sync status\t: Failed");
            });

        this.client = sequelize;
        // @ts-ignore
        this.models = sequelize.models;
    }

    async addEndpoint(endPointData: IEndpoint) {
        const endpoint = await this.models.Endpoint.create(endPointData);
        return endpoint.dataValues as IDBEndpoint;
    }
    async updateEndpoint({ newData, id }: { newData: IEndpoint; id: string }) {
        const updated = await this.models.Endpoint.update(newData, {
            where: { id },
        });
        return updated[0] > 0;
    }
    async removeEndpoint(endpointId: string) {
        const deleted = await this.models.Endpoint.destroy({
            where: { id: endpointId },
        });
        return deleted > 0;
    }
    async getEndpoints({ projectId }: { projectId: string }) {
        const endpoint = await this.models.Endpoint.findAll({
            where: { projectId },
        });
        return endpoint.map((e) => e.dataValues) as IDBEndpoint[];
    }
    async getEndpoint({
        projectId,
        endpointId,
    }: {
        projectId: string;
        endpointId: string;
    }) {
        const endpoint = await this.models.Endpoint.findOne({
            where: { projectId, id: endpointId },
            include: [
                { model: this.models.Variables, as: "variables" },
                { model: this.models.Headers, as: "headers" },
                { model: this.models.Schema, as: "schema" },
                { model: this.models.EndpointResponse, as: "requests" },
            ],
        });
        return endpoint.dataValues as IDBEndpoint;
    }

    async addEndpointVariable(variable: IVariable) {
        const variableData = await this.models.Variables.create(variable);
        return variableData.dataValues;
    }
    async removeEndpointVariable(variableId: string) {
        const deleted = await this.models.Variables.destroy({
            where: { id: variableId },
        });
        return deleted > 0;
    }
    async addEndpointHeader(header: IHeader) {
        const headerData = await this.models.Headers.create(header);
        return headerData.dataValues;
    }
    async removeEndpointHeader(headerId: string) {
        const deleted = await this.models.Headers.destroy({
            where: { id: headerId },
        });
        return deleted > 0;
    }
    async addEndpointBody({
        endpointId,
        body,
    }: {
        endpointId: string;
        body: string;
    }) {
        const updated = await this.models.Endpoint.update(
            { body },
            { where: { id: endpointId } }
        );
        return updated[0] > 0;
    }
    async addEndpointSchema(schemaData: ISchemaItem) {
        const schema = await this.models.Schema.create(schemaData);
        return schema.dataValues;
    }
    async removeEndpointSchema(schemaId: string) {
        const deleted = await this.models.Schema.destroy({
            where: { id: schemaId },
        });
        return deleted > 0;
    }
    async addEndpointResponse(data: IEndpointResponse) {
        const response = await this.models.EndpointResponse.create(data);
        return response.dataValues;
    }
    async removeEndpointResponse(requestId: string) {
        const deleted = await this.models.EndpointResponse.destroy({
            where: { id: requestId },
        });
        return deleted > 0;
    }
}
