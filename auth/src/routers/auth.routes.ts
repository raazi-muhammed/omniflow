import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { IAuthController } from "../interfaces/controller.interface.js";

export default function buildAuthRoutes({
    router,
    authControllers,
    verifyMiddleware,
}: {
    router: Router;
    authControllers: IAuthController;
    verifyMiddleware: IVerifyUserMiddleware;
}) {
    router.post("/sign-up", makeCallback(authControllers.signIn));
    router.post("/login", makeCallback(authControllers.login));
    router.get(
        "/current-user",
        verifyMiddleware,
        makeCallback(authControllers.currentUser)
    );

    return router;
}
