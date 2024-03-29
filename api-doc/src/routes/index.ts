import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import buildEndpointRoutes from "./endpoint.routes.js";
import express from "express";
import { endpointController } from "../controllers/index.js";
import buildVariableRoutes from "./variable.routes.js";
import buildHeaderRoutes from "./header.routes.js";
import buildSchemaRoutes from "./schema.routes.js";
import buildResponseRoutes from "./response.routes.js";
import buildFolderRoutes from "./folder.routes.js";
import { folderController } from "../controllers/index.js";

const router = express.Router();

export const endpointRoutes = buildEndpointRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
export const variableRoutes = buildVariableRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
export const headerRoutes = buildHeaderRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
export const schemaRoutes = buildSchemaRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
export const responseRoutes = buildResponseRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
export const folderRoutes = buildFolderRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    folderController,
});
