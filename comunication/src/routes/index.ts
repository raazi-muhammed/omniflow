import express from "express";
import {
    verifyProjectMiddleware,
    verifyUserMiddleware,
} from "@omniflow/common";
import buildMeetingRoutes from "./meeting.routes.js";
import { meetingController } from "../controller/index.js";

const router = express.Router();

export const meetingRoutes = buildMeetingRoutes({
    router,
    verifyUser: verifyUserMiddleware,
    verifyProject: verifyProjectMiddleware,
    controllers: meetingController,
});
