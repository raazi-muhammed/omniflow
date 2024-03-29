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
        makeCallback(controllers.getMembers)
    );

    router.post(
        "/teams/members/invite",
        verifyUser,
        verifyProject,
        makeCallback(controllers.inviteMember)
    );
    router.patch(
        "/teams/members/invite/status",
        verifyUser,
        makeCallback(controllers.changeMemberInvitationStatus)
    );
    router.get(
        "/teams/:name",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getTeam)
    );
    router.patch(
        "/teams/:name/members/change-lead",
        verifyUser,
        verifyProject,
        makeCallback(controllers.changeTeamLead)
    );
    router.get(
        "/teams/:name/members",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMembersFromTeam)
    );
    router.patch(
        "/teams/:name/members/move",
        verifyUser,
        verifyProject,
        makeCallback(controllers.moveTeamMember)
    );
    router.delete(
        "/teams/:name/members/:email",
        verifyUser,
        verifyProject,
        makeCallback(controllers.removeTeamMember)
    );

    return router;
}
