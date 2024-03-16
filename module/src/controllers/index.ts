import { IModuleController } from "../interfaces/controller.interface.js";
import buildAddModuleController from "./module/add-module.controller.js";

const addModule = buildAddModuleController();

export const moduleController: IModuleController = Object.freeze({
    addModule,
});
