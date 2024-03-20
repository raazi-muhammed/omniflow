import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IMeetingController } from "../interfaces/controller.interface.js";

export default function buildMeetingRoutes({
    router,
    verifyUser,
    verifyProject,
    controllers,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    controllers: IMeetingController;
}) {
    router.post(
        "/meetings",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addMeeting)
    );
    router.get(
        "/meetings",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMeetings)
    );
    router.get(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMeeting)
    );

    return router;
}
