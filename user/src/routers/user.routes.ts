import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { IAuthController } from "../interfaces/controller.interface.js";

export default function buildUserRoutes({
    router,
    authControllers,
    verifyMiddleware,
}: {
    router: Router;
    authControllers: IAuthController;
    verifyMiddleware: IVerifyUserMiddleware;
}) {
    router.get(
        "/get-profile",
        verifyMiddleware,
        makeCallback(authControllers.getProfile)
    );

    router.post(
        "/edit-profile",
        verifyMiddleware,
        makeCallback(authControllers.editProfile)
    );

    return router;
}
