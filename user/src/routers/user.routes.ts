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
    /**
     * @openapi
     * /users/public/{email}:
     *   get:
     *     summary: Get public details of users
     *     parameters:
     *       - name: email
     *         in: path
     *         required: true
     *         description: email of user to find
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of user details
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 username:
     *                   type: string
     *                 name:
     *                   type: string
     *                 avatar:
     *                   type: string
     *       '400':
     *         description: Invalid email
     *       '404':
     *         description: User not found
     */
    router.get(
        "/users/public/:email",
        verifyMiddleware,
        makeCallback(authControllers.getPublicUser)
    );

    /**
     * @openapi
     * /users/current:
     *   get:
     *     summary: Get public details of users
     *     responses:
     *       '200':
     *         description: A JSON of user details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/user'
     *       '404':
     *         description: User not found
     */
    router.get(
        "/users/current",
        verifyMiddleware,
        makeCallback(authControllers.currentUser)
    );

    /**
     * @openapi
     * /users/change-password:
     *   patch:
     *     summary: Get public user details
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               currentPassword:
     *                 type: string
     *               newPassword:
     *                 type: string
     *             required:
     *               - currentPassword
     *               - newPassword
     *     responses:
     *       '200':
     *         description: Password changed
     *       '401':
     *         description: Incorrect password
     */
    router.patch(
        "/users/change-password",
        verifyMiddleware,
        makeCallback(authControllers.changePassword)
    );

    /**
     * @openapi
     * /users/{id}:
     *   get:
     *     summary: Get user details
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the user
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of user details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/user'
     *       '401':
     *         description: Incorrect password
     */
    router.get(
        "/users/:id",
        verifyMiddleware,
        makeCallback(authControllers.getProfile)
    );

    /**
     * @openapi
     * /users/{id}:
     *   put:
     *     summary: Edit user details
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the user
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               avatar:
     *                 type: string
     *             required:
     *               - name
     *     responses:
     *       '200':
     *         description: User edited
     *       '404':
     *         description: User not found
     */
    router.put(
        "/users/:id",
        verifyMiddleware,
        updateImageMiddleware,
        makeCallback(authControllers.editProfile)
    );

    return router;
}
