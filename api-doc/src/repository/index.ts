import { IEndpointsRepository } from "../interfaces/repository.interface.js";
import { sequelize } from "./connect.js";
import { BuildEndpointRepository } from "./endpoint-list.respository.js";

export const endPointsRepository: IEndpointsRepository =
    new BuildEndpointRepository(sequelize);
