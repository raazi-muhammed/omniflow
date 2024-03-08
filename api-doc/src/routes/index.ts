import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import buildEndpointRoutes from "./endpoint.routes.js";
import express from "express";
import { endpointController } from "../controllers/index.js";
const router = express.Router();

export const endpointRoutes = buildEndpointRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    endpointController: endpointController,
});
