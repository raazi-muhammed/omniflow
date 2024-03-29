import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildResponseRoutes({
    router,
    verifyUser,
    verifyProject,
    endpointController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    endpointController: IEndpointController;
}) {
    /**
     * @openapi
     * /endpoints/{id}/responses:
     *   post:
     *     summary: Create a new response
     *     tags:
     *       - Response
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               statusCode:
     *                 type: number
     *               body:
     *                 type: string
     *               type:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - statusCode
     *               - type
     *     responses:
     *       '201':
     *         description: Response added to endpoint
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints/:id/responses",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointResponse)
    );

    /**
     * @openapi
     * /endpoints/{id}/responses/{responseId}:
     *   delete:
     *     summary: Remove a response
     *     tags:
     *       - Response
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *       - name: responseId
     *         in: path
     *         required: true
     *         description: id to find the response to delete
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Response remove from endpoint
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/endpoints/:id/responses/:responseId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointResponse)
    );

    return router;
}
