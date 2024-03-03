import express from "express";
import authControllers from "../controllers/index.js";
import buildAuthRoutes from "./auth.routes.js";
import { verifyUserMiddleware } from "@omniflow/common";
import buildUserRoutes from "./user.routes.js";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

export const authRoutes = buildAuthRoutes({
    router,
    authControllers,
    verifyMiddleware: verifyUserMiddleware,
});

export const userRoutes = buildUserRoutes({
    router,
    authControllers,
    verifyMiddleware: verifyUserMiddleware,
    updateImageMiddleware: upload.single("avatar"),
});
