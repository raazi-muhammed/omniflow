import {
    IModuleController,
    ITaskController,
} from "../interfaces/controller.interface.js";
import buildAddModuleController from "./module/add-module.controller.js";
import buildGetModulesController from "./module/get-modules.controller.js";
import { moduleUseCases, taskUseCases } from "../use-cases/index.js";
import buildGetModuleListController from "./module/get-module-list.controller.js";
import buildGetModuleController from "./module/get-module.controller.js";
import buildAddTaskController from "./task/add-task.controller.js";
import buildGetTasksController from "./task/get-tasks.controller.js";
import buildGetTaskController from "./task/get-task.controller.js";
import buildEditTaskController from "./task/edit-task.controller.js";
import buildDeleteTaskController from "./task/delete-task.controller.js";
import buildEditModuleController from "./module/edit-module.controller.js";
import buildDeleteModuleController from "./module/delete-module.controller.js";
import buildChangeTaskStatusController from "./task/change-task-status.controller.js";
import buildChangeTaskAssigneeController from "./task/change-assignee.controller.js";

const addModule = buildAddModuleController({ moduleUseCases });
const getModules = buildGetModulesController({ moduleUseCases });
const getModuleList = buildGetModuleListController({ moduleUseCases });
const getModule = buildGetModuleController({ moduleUseCases });
const editModule = buildEditModuleController({ moduleUseCases });
const deleteModule = buildDeleteModuleController({ moduleUseCases });

const addTask = buildAddTaskController({ taskUseCases });
const getTasks = buildGetTasksController({ taskUseCases });
const getTask = buildGetTaskController({ taskUseCases });
const editTask = buildEditTaskController({ taskUseCases });
const deleteTask = buildDeleteTaskController({ taskUseCases });
const changeTaskStatus = buildChangeTaskStatusController({ taskUseCases });
const changeTaskAssignee = buildChangeTaskAssigneeController({ taskUseCases });

export const moduleController: IModuleController = Object.freeze({
    addModule,
    getModules,
    getModuleList,
    getModule,
    editModule,
    deleteModule,
});

export const taskController: ITaskController = Object.freeze({
    addTask,
    getTasks,
    getTask,
    editTask,
    deleteTask,
    changeTaskStatus,
    changeTaskAssignee,
});
