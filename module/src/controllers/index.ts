import { IModuleController } from "../interfaces/controller.interface.js";
import buildAddModuleController from "./module/add-module.controller.js";
import buildGetModulesController from "./module/get-modules.controller.js";

const addModule = buildAddModuleController();
const getModules = buildGetModulesController();
export const moduleController: IModuleController = Object.freeze({
    addModule,
    getModules,
});
