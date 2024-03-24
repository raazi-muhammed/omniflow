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
    router.put(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.editMeeting)
    );
    router.delete(
        "/meetings/:meetingId",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMeeting)
    );
    router.get(
        "/meetings/:meetingId/join",
        verifyUser,
        verifyProject,
        makeCallback(controllers.joinMeeting)
    );
    router.post(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addMeetingNotes)
    );
    router.delete(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMeetingNotes)
    );
    router.put(
        "/meetings/:meetingId/notes",
        verifyUser,
        verifyProject,
        makeCallback(controllers.editMeetingNotes)
    );

    return router;
}
