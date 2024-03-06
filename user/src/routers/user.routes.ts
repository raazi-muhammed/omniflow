import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { IAuthController } from "../interfaces/controller.interface.js";

export default function buildUserRoutes({
    router,
    authControllers,
    verifyMiddleware,
    updateImageMiddleware,
}: {
    router: Router;
    authControllers: IAuthController;
    verifyMiddleware: IVerifyUserMiddleware;
    updateImageMiddleware: any;
}) {
    router.get(
        "/get-profile",
        verifyMiddleware,
        makeCallback(authControllers.getProfile)
    );

    router.post(
        "/edit-profile",
        verifyMiddleware,
        updateImageMiddleware,
        makeCallback(authControllers.editProfile)
    );
    router.patch(
        "/change-password",
        verifyMiddleware,
        makeCallback(authControllers.changePassword)
    );

    router.get(
        "/get-public-user",
        verifyMiddleware,
        makeCallback(authControllers.getPublicUser)
    );

    return router;
}
