import express from "express";
import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import buildMeetingRoutes from "./meeting.routes.js";
import { chatController, meetingController } from "../controller/index.js";
import buildChatRoutes from "./chat.routes.js";

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
});
