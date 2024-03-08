import { Sequelize } from "sequelize";
import { IDBEndpoint, endpointModel } from "./endpoint.model.js";
import { IEndpoint } from "../interfaces/entity.interface.js";

export class BuildEndpointRepository {
    client: Sequelize;
    models: any;

    constructor(sequelize: Sequelize) {
        endpointModel(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async addEndpoint(endPointData: IEndpoint) {
        const endpoint = await this.models.Endpoint.create(endPointData);
        return endpoint as IDBEndpoint;
    }
    async getEndpoints({ projectId }: { projectId: string }) {
        const endpoint = await this.models.Endpoint.findAll({
            where: { projectId },
        });
        return endpoint as IDBEndpoint[];
    }
}
