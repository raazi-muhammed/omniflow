import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { ITeamController } from "../interfaces/controller.interface.js";

export default function buildTeamRoutes({
    router,
    verifyUser,
    verifyProject,
    controllers,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    controllers: ITeamController;
}) {
    router.post(
        "/add-team",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addTeam)
    );
    router.patch(
        "/remove-team",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeTeam)
    );
    router.post(
        "/invite-member",
        verifyUser,
        verifyProject,
        makeCallback(controllers.inviteMember)
    );
    router.post(
        "/change-invitation-status",
        verifyUser,
        makeCallback(controllers.changeInvitationStatus)
    );
    router.get(
        "/get-teams",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getTeams)
    );
    router.get(
        "/get-members-list",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMembersList)
    );
    router.post(
        "/change-team-lead",
        verifyUser,
        verifyProject,
        makeCallback(controllers.changeTeamLead)
    );
    router.get(
        "/team-members",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMemberFromTeam)
    );
    router.post(
        "/move-member",
        verifyUser,
        verifyProject,
        makeCallback(controllers.moveMember)
    );
    router.post(
        "/remove-member",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMemberFromTeam)
    );
    return router;
}
