import { IModuleController } from "../interfaces/controller.interface.js";
import buildAddModuleController from "./module/add-module.controller.js";
import buildGetModulesController from "./module/get-modules.controller.js";
import { moduleUseCases } from "../use-cases/index.js";

const addModule = buildAddModuleController({ moduleUseCases });
const getModules = buildGetModulesController({ moduleUseCases });

export const moduleController: IModuleController = Object.freeze({
    addModule,
    getModules,
});
