import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import express from "express";
import buildModuleRoutes from "./module.routes.js";
import { moduleController, taskController } from "../controllers/index.js";
import buildTaskRoutes from "./task.routes.js";
const router = express.Router();

export const moduleRoutes = buildModuleRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    moduleController,
});

export const taskRoutes = buildTaskRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    taskController,
});
