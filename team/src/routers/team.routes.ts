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
    router.get(
        "/teams",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getTeams)
    );
    router.post(
        "/teams",
        verifyUser,
        verifyProject,
        makeCallback(controllers.addTeam)
    );
    router.delete(
        "/teams/:name",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeTeam)
    );
    router.get(
        "/teams/members",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMembersList)
    );

    router.post(
        "/teams/members/invite",
        verifyUser,
        verifyProject,
        makeCallback(controllers.inviteMember)
    );
    router.put(
        "/teams/members/invite/status",
        verifyUser,
        makeCallback(controllers.changeInvitationStatus)
    );
    router.get(
        "/teams/:name/members",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMemberFromTeam)
    );
    router.patch(
        "/teams/:name/members/change-lead",
        verifyUser,
        verifyProject,
        makeCallback(controllers.changeTeamLead)
    );
    router.patch(
        "/teams/:name/members/move",
        verifyUser,
        verifyProject,
        makeCallback(controllers.moveMember)
    );
    router.delete(
        "/teams/:name/members/:email",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeMemberFromTeam)
    );

    return router;
}
