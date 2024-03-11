import { ModelDefined, Sequelize } from "sequelize";
import { IDBEndpoint, endpointModel } from "./endpoint.model.js";
import {
    IEndpoint,
    IHeader,
    ISchemaItem,
    IVariable,
} from "../interfaces/entity.interface.js";
import { IDBVariable, variableModel } from "./endpoint-variable.model.js";
import { IDBHeader, headerModel } from "./endpoint-header.mode.js";
import { IDBSchemaItem, schemaModel } from "./endpoint-body.model.js";

export class BuildEndpointRepository {
    client: Sequelize;
    models: {
        Endpoint: ModelDefined<IDBEndpoint, IEndpoint>;
        Variables: ModelDefined<IDBVariable, IVariable>;
        Headers: ModelDefined<IDBHeader, IHeader>;
        SchemaModel: ModelDefined<IDBSchemaItem, ISchemaItem>;
    };

    constructor(sequelize: Sequelize) {
        const EndpointModel = endpointModel(sequelize);
        const VariableModel = variableModel(sequelize);
        const HeaderModel = headerModel(sequelize);
        const SchemaModel = schemaModel(sequelize);
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
        EndpointModel.hasMany(SchemaModel, {
            as: "schema",
            foreignKey: "endpointId",
        });
        SchemaModel.belongsTo(EndpointModel, {
            foreignKey: "endpointId",
        });
        sequelize.sync({ alter: true });

        this.client = sequelize;
        // @ts-ignore
        this.models = sequelize.models;
    }

    async addEndpoint(endPointData: IEndpoint) {
        const endpoint = await this.models.Endpoint.create(endPointData);
        return endpoint.dataValues as IDBEndpoint;
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
            ],
        });
        return endpoint.dataValues as IDBEndpoint;
    }

    async addEndpointVariable(variable: IVariable) {
        const variableData = await this.models.Variables.create(variable);
        return true;
    }
    async addEndpointHeader(header: IHeader) {
        const headerData = await this.models.Headers.create(header);
        return true;
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
        return true;
    }
}
