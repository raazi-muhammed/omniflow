import Module from "../entities/module.entity.js";
import buildAddModuleUseCase from "./module/add-module.use-case.js";
import { moduleRepository } from "../repository/mongo/index.js";
import { IModuleUseCases } from "../interfaces/use-case.interface.js";
import buildGetModulesUseCase from "./module/get-modules.use-case.js";
import buildGetModuleListUseCase from "./module/get-module-list.use-case.js";
import buildGetModuleUseCase from "./module/get-module.use-case.js";

const addModule = buildAddModuleUseCase({
    moduleRepository,
    ModuleCreator: Module,
});

const getModules = buildGetModulesUseCase({ moduleRepository });
const getModuleList = buildGetModuleListUseCase({ moduleRepository });
const getModule = buildGetModuleUseCase({ moduleRepository });

export const moduleUseCases: IModuleUseCases = Object.freeze({
    addModule,
    getModules,
    getModuleList,
    getModule,
});
