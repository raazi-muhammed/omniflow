import { IDatabaseRepository } from "../../interfaces/repository.interface.js";
import { sequelize } from "./connect.js";
import { BuildDatabaseRepository } from "./database-list.repository.js";

export const databaseRepository: IDatabaseRepository =
    new BuildDatabaseRepository(sequelize);
