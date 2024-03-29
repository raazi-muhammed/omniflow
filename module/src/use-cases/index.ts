import Module from "../entities/module.entity.js";
import buildAddModuleUseCase from "./module/add-module.use-case.js";
import {
    moduleRepository,
    taskRepository,
    memberRepository,
} from "../repository/mongo/index.js";
import {
    IMemberUseCase,
    IModuleUseCases,
    ITaskUseCases,
} from "../interfaces/use-case.interface.js";
import buildGetModulesUseCase from "./module/get-modules.use-case.js";
import buildGetModuleListUseCase from "./module/get-module-list.use-case.js";
import buildGetModuleUseCase from "./module/get-module.use-case.js";
import buildAddTaskUseCase from "./task/add-task.use-case.js";
import Task from "../entities/task.entity.js";
import buildGetTasksUseCase from "./task/get-tasks.use-case.js";
import buildGetTaskUseCase from "./task/get-task.use-case.js";
import buildEditTaskUseCase from "./task/edit-task.use-case.js";
import buildDeleteTaskUseCase from "./task/delete-task.use-case.js";
import buildDeleteModuleUseCase from "./module/delete-module.use-case.js";
import buildEditModuleUseCase from "./module/edit-module.use-case.js";
import buildChangeTaskStatusUseCase from "./task/change-task-status.use-case.js";
import buildChangeTaskAssigneeUseCase from "./task/change-task-assignee.use-case.js";
import buildEditMemberUseCase from "./member/edit-member.use-case.js";

const addModule = buildAddModuleUseCase({
    moduleRepository,
    ModuleCreator: Module,
});

const getModules = buildGetModulesUseCase({ moduleRepository });
const getModuleList = buildGetModuleListUseCase({ moduleRepository });
const getModule = buildGetModuleUseCase({ moduleRepository });
const deleteModule = buildDeleteModuleUseCase({ moduleRepository });
const editModule = buildEditModuleUseCase({
    moduleRepository,
    ModuleCreator: Module,
});

const addTask = buildAddTaskUseCase({
    taskRepository,
    TaskCreator: Task,
    memberRepository,
});
const getTasks = buildGetTasksUseCase({ taskRepository });
const getTask = buildGetTaskUseCase({ taskRepository });
const editTask = buildEditTaskUseCase({ taskRepository });
const deleteTask = buildDeleteTaskUseCase({ taskRepository });
const changeTaskStatus = buildChangeTaskStatusUseCase({ taskRepository });
const changeTaskAssignee = buildChangeTaskAssigneeUseCase({
    taskRepository,
    memberRepository,
});

export const moduleUseCases: IModuleUseCases = Object.freeze({
    addModule,
    getModules,
    getModuleList,
    getModule,
    editModule,
    deleteModule,
});

export const taskUseCases: ITaskUseCases = Object.freeze({
    addTask,
    getTasks,
    getTask,
    editTask,
    deleteTask,
    changeTaskStatus,
    changeTaskAssignee,
});

const editMember = buildEditMemberUseCase({ memberRepository });

export const memberUseCases: IMemberUseCase = Object.freeze({
    editMember,
});
