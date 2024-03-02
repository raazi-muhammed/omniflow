import express from "express";
import authControllers from "../controllers/index.js";
import buildAuthRoutes from "./auth.routes.js";
import { verifyUserMiddleware } from "@omniflow/common";

const router = express.Router();

const authRoutes = buildAuthRoutes({
    router,
    authControllers,
    verifyMiddleware: verifyUserMiddleware,
});

export default authRoutes;
