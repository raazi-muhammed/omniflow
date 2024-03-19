import { IModuleController } from "../interfaces/controller.interface.js";
import buildAddModuleController from "./module/add-module.controller.js";
import buildGetModulesController from "./module/get-modules.controller.js";
import { moduleUseCases } from "../use-cases/index.js";
import buildGetModuleListController from "./module/get-module-list.controller.js";
import buildGetModuleController from "./module/get-module.controller.js";

const addModule = buildAddModuleController({ moduleUseCases });
const getModules = buildGetModulesController({ moduleUseCases });
const getModuleList = buildGetModuleListController({ moduleUseCases });
const getModule = buildGetModuleController({ moduleUseCases });

export const moduleController: IModuleController = Object.freeze({
    addModule,
    getModules,
    getModuleList,
    getModule,
});
