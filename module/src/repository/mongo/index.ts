import moduleModel from "./models/module.model.js";
import buildModuleRepository from "./module-list.repository.js";

export const moduleRepository = buildModuleRepository({
    database: moduleModel,
});
