import { ModelDefined, Sequelize } from "sequelize";
import { IDBEndpoint, endpointModel } from "./models/endpoint.model.js";
import {
    IEndpoint,
    IEndpointResponse,
    IFolder,
    IHeader,
    ISchemaItem,
    IVariable,
} from "../../interfaces/entity.interface.js";
import {
    IDBVariable,
    variableModel,
} from "./models/endpoint-variable.model.js";
import { IDBHeader, headerModel } from "./models/endpoint-header.mode.js";
import { IDBSchemaItem, schemaModel } from "./models/endpoint-schema.model.js";
import {
    IDBEndpointResponse,
    endpointResponseModel,
} from "./models/endpoint-response.model.js";
import { logger } from "@omniflow/common";
import { IDBFolder, folderModel } from "./models/folder.model.js";

export class BuildEndpointRepository {
    client: Sequelize;
    models: {
        Endpoint: ModelDefined<IDBEndpoint, IEndpoint>;
        Variables: ModelDefined<IDBVariable, IVariable>;
        Headers: ModelDefined<IDBHeader, IHeader>;
        Schema: ModelDefined<IDBSchemaItem, ISchemaItem>;
        EndpointResponse: ModelDefined<IDBEndpointResponse, IEndpointResponse>;
        Folder: ModelDefined<IDBFolder, IFolder>;
    };

    constructor(sequelize: Sequelize) {
        const Endpoint = endpointModel(sequelize);
        const Variable = variableModel(sequelize);
        const Header = headerModel(sequelize);
        const Schema = schemaModel(sequelize);
        const EndpointResponse = endpointResponseModel(sequelize);
        const Folder = folderModel(sequelize);

        Endpoint.hasMany(Variable, {
            as: "variables",
            foreignKey: "endpointId",
        });
        Variable.belongsTo(Endpoint, {
            foreignKey: "endpointId",
        });
        Endpoint.hasMany(Header, {
            as: "headers",
            foreignKey: "endpointId",
        });
        Header.belongsTo(Endpoint, {
            foreignKey: "endpointId",
        });
        Endpoint.hasMany(Schema, {
            as: "schema",
            foreignKey: "endpointId",
        });
        Schema.belongsTo(Endpoint, {
            foreignKey: "endpointId",
        });
        Endpoint.hasMany(EndpointResponse, {
            as: "requests",
            foreignKey: "endpointId",
        });
        EndpointResponse.belongsTo(Endpoint, {
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
    async getEndpoints({
        projectId,
        parentFolder = null,
    }: {
        projectId: string;
        parentFolder?: string;
    }) {
        const endpoint = await this.models.Endpoint.findAll({
            where: { projectId, parentFolder },
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
    async addFolder(data: IFolder) {
        const folder = await this.models.Folder.create(data);
        return folder?.dataValues as IDBFolder;
    }
    async getFolderList({ projectId }: { projectId: string }) {
        const folders = await this.models.Folder.findAll({
            where: { projectId },
        });
        return folders.map((e) => e.dataValues) as IDBFolder[];
    }
    async getFolders({
        projectId,
        parentFolder = null,
    }: {
        projectId: string;
        parentFolder?: string;
    }) {
        const folders = await this.models.Folder.findAll({
            where: { projectId, parentFolder },
        });
        return folders.map((e) => e.dataValues) as IDBFolder[];
    }
}
