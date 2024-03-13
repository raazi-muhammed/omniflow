import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { IEndpointController } from "../interfaces/controller.interface.js";

export default function buildHeaderRoutes({
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
     * /endpoints/{id}/headers:
     *   post:
     *     summary: Create a new headers
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
     *               key:
     *                 type: string
     *               value:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - key
     *               - value
     *     responses:
     *       '201':
     *         description: Header added to endpoint
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/endpoints/:id/headers",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.addEndpointHeader)
    );

    /**
     * @openapi
     * /endpoints/{id}/headers/{headerId}:
     *   delete:
     *     summary: Remove a headers
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: id to find the endpoint
     *         schema:
     *           type: string
     *       - name: headerId
     *         in: path
     *         required: true
     *         description: id to find the header to delete
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Header remove from endpoint
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/endpoints/:id/headers/:headerId",
        verifyUser,
        verifyProject,
        makeCallback(endpointController.removeEndpointHeader)
    );

    return router;
}
