import { IVerifyUserMiddleware, makeCallback } from "@omniflow/common";
import { Router } from "express";
import { IAuthController } from "../interfaces/controller.interface.js";

export default function buildAuthRoutes({
    router,
    authControllers,
}: {
    router: Router;
    authControllers: IAuthController;
    verifyMiddleware: IVerifyUserMiddleware;
}) {
    router.post("/sign-up", makeCallback(authControllers.signIn));
    router.post("/login", makeCallback(authControllers.login));
    router.post(
        "/sign-up/verify-user",
        makeCallback(authControllers.verifyUser)
    );
    router.post(
        "/sign-up/verify-user/resend-code",
        makeCallback(authControllers.resendCode)
    );
    router.post("/logout", makeCallback(authControllers.logOut));

    return router;
}
