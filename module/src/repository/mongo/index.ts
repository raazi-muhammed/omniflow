import moduleModel from "./models/module.model.js";
import taskModel from "./models/task.model.js";
import buildModuleRepository from "./module-list.repository.js";
import buildTaskRepository from "./task-list.repository.js";

export const moduleRepository = buildModuleRepository({
    database: moduleModel,
});
export const taskRepository = buildTaskRepository({
    database: taskModel,
});
