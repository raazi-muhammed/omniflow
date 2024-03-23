import buildTableRoutes from "./table.routes.js";
import { tableController } from "../controllers/index.js";
import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import express from "express";
import buildRelationRoutes from "./relation.routes.js";
import { relationController } from "../controllers/index.js";

const router = express.Router();

export const tableRoutes = buildTableRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    tableController,
});

export const relationRoutes = buildRelationRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    relationController,
});
