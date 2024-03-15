import { IEndpointsRepository } from "../../interfaces/repository.interface.js";
import { sequelize } from "./connect.js";
import { BuildEndpointRepository } from "./endpoint-list.repository.js";

export const endPointsRepository: IEndpointsRepository =
    new BuildEndpointRepository(sequelize);
