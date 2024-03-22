import buildTableRoutes from "./table.routes.js";
import { tableController } from "../controllers/index.js";
import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import express from "express";

const router = express.Router();

export const tableRoutes = buildTableRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    tableController,
});
