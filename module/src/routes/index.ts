import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import express from "express";
import buildModuleRoutes from "./module.routes.js";
import { moduleController } from "../controllers/index.js";
const router = express.Router();

export const moduleRoutes = buildModuleRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    moduleController,
});
