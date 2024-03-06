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
        "/users/public/:email",
        verifyMiddleware,
        makeCallback(authControllers.getPublicUser)
    );
    router.get(
        "/users/current",
        verifyMiddleware,
        makeCallback(authControllers.currentUser)
    );
    router.patch(
        "/users/change-password",
        verifyMiddleware,
        makeCallback(authControllers.changePassword)
    );
    router.get(
        "/users/:id",
        verifyMiddleware,
        makeCallback(authControllers.getProfile)
    );
    router.put(
        "/users/:id",
        verifyMiddleware,
        updateImageMiddleware,
        makeCallback(authControllers.editProfile)
    );

    return router;
}
