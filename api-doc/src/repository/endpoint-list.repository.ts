import { HasOne, ModelDefined, Sequelize } from "sequelize";
import { IDBEndpoint, endpointModel } from "./endpoint.model.js";
import { IEndpoint, IVariable } from "../interfaces/entity.interface.js";
import { IDBVariable, variableModel } from "./endpoint-variable.model.js";

export class BuildEndpointRepository {
    client: Sequelize;
    models: {
        Endpoint: ModelDefined<IDBEndpoint, IEndpoint>;
        Variables: ModelDefined<IDBVariable, IVariable>;
    };

    constructor(sequelize: Sequelize) {
        const EndpointModel = endpointModel(sequelize);
        const VariableModel = variableModel(sequelize);
        EndpointModel.hasMany(VariableModel, {
            as: "variables",
            foreignKey: "endpointId",
        });
        VariableModel.belongsTo(EndpointModel, {
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
            include: [{ model: this.models.Variables, as: "variables" }],
        });
        return endpoint.dataValues as IDBEndpoint;
    }

    async addEndpointVariable(variable: IVariable) {
        const variableData = await this.models.Variables.create(variable);
        return true;
    }
}
