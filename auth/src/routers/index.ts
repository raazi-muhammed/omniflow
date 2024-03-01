import express from "express";
import authControllers from "../controllers/index.js";
import buildAuthRoutes from "./auth.routes.js";
import buildVerifyUserMiddleware from "../lib/current-user-middleware.js";
import token from "../lib/token.js";

const router = express.Router();

const verifyMiddleware = buildVerifyUserMiddleware({ token });
const authRoutes = buildAuthRoutes({
    router,
    authControllers,
    verifyMiddleware,
});

export default authRoutes;
