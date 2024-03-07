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
    /**
     * @openapi
     * /sign-up:
     *   post:
     *     summary: User signup
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - name
     *               - username
     *               - email
     *               - password
     *     responses:
     *       '201':
     *         description: Check your mail for verification
     *       '409':
     *         description: Username taken, Email taken
     */
    router.post("/sign-up", makeCallback(authControllers.signIn));

    /**
     * @openapi
     * /login:
     *   post:
     *     summary: User login
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - email
     *               - password
     *     responses:
     *       '200':
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/user'
     *       '404':
     *         description: User not found
     *       '401':
     *         description: Incorrect password, user is not verified
     */
    router.post("/login", makeCallback(authControllers.login));

    /**
     * @openapi
     * /sign-up/verify-user:
     *   post:
     *     summary: Verify user by code
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               code:
     *                 type: integer
     *             required:
     *               - email
     *               - code
     *     responses:
     *       '200':
     *         description: OK
     *       '404':
     *         description: Verification code not found
     *       '401':
     *         description: Invalid verification code
     */
    router.post(
        "/sign-up/verify-user",
        makeCallback(authControllers.verifyUser)
    );

    /**
     * @openapi
     * /sign-up/verify-user/resend-code:
     *   post:
     *     summary: Resend verification code
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *             required:
     *               - email
     *     responses:
     *       '200':
     *         description: OK
     *       '404':
     *         description: User not found
     *       '401':
     *         description: Invalid verification code
     */
    router.post(
        "/sign-up/verify-user/resend-code",
        makeCallback(authControllers.resendCode)
    );

    /**
     * @openapi
     * /logout:
     *   post:
     *     summary: Logout user
     *     responses:
     *       '200':
     *         description: OK
     */
    router.post("/logout", makeCallback(authControllers.logOut));

    return router;
}
