import express from "express";
import buildTeamRoutes from "./team.routes.js";
import teamController from "../controllers/index.js";
import { verifyUserMiddleware } from "@omniflow/common";

const router = express.Router();

export default buildTeamRoutes({
    router,
    verifyUserMiddleware,
    controllers: teamController,
});
