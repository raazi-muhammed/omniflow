import Module from "../entities/module.entity.js";
import buildAddModuleUseCase from "./module/add-module.use-case.js";
import { moduleRepository, taskRepository } from "../repository/mongo/index.js";
import {
    IModuleUseCases,
    ITaskUseCases,
} from "../interfaces/use-case.interface.js";
import buildGetModulesUseCase from "./module/get-modules.use-case.js";
import buildGetModuleListUseCase from "./module/get-module-list.use-case.js";
import buildGetModuleUseCase from "./module/get-module.use-case.js";
import buildAddTaskUseCase from "./task/add-task.use-case.js";
import Task from "../entities/task.entity.js";
import buildGetTasksUseCase from "./task/get-tasks.use-case.js";

const addModule = buildAddModuleUseCase({
    moduleRepository,
    ModuleCreator: Module,
});

const getModules = buildGetModulesUseCase({ moduleRepository });
const getModuleList = buildGetModuleListUseCase({ moduleRepository });
const getModule = buildGetModuleUseCase({ moduleRepository });

const addTask = buildAddTaskUseCase({ taskRepository, TaskCreator: Task });

export const moduleUseCases: IModuleUseCases = Object.freeze({
    addModule,
    getModules,
    getModuleList,
    getModule,
});

const getTasks = buildGetTasksUseCase({ taskRepository });

export const taskUseCases: ITaskUseCases = Object.freeze({
    addTask,
    getTasks,
});
