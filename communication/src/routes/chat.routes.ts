import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IChatController } from "../interfaces/controller.interface.js";

export default function buildChatRoutes({
    router,
    verifyUser,
    verifyProject,
    controllers,
    updateImageMiddleware,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    controllers: IChatController;
    updateImageMiddleware: any;
}) {
    /**
     * @openapi
     * /rooms/{roomId}/message:
     *   get:
     *     summary: Get messages from a room
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: roomId
     *         in: path
     *         required: true
     *         description: id to find the room
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A array of messages
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/message'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/rooms/:roomId/messages",
        verifyUser,
        verifyProject,
        makeCallback(controllers.getMessages)
    );

    /**
     * @openapi
     * /rooms/{roomId}/message:
     *   post:
     *     summary: Get messages from a room
     *     tags:
     *       - Meeting
     *     parameters:
     *       - name: roomId
     *         in: path
     *         required: true
     *         description: id to find the room
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Message sent
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/rooms/:roomId/messages",
        verifyUser,
        verifyProject,
        updateImageMiddleware,
        makeCallback(controllers.addMessage)
    );

    return router;
}
