import express from "express";
import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import buildMeetingRoutes from "./meeting.routes.js";
import { chatController, meetingController } from "../controller/index.js";
import buildChatRoutes from "./chat.routes.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

export const meetingRoutes = buildMeetingRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    controllers: meetingController,
});
export const chatRoutes = buildChatRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    controllers: chatController,
    updateImageMiddleware: upload.single("file"),
});
