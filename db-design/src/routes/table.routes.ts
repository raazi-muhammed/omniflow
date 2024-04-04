import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { ITableController } from "../interfaces/controller.interface.js";
import {
    verifyEditAccess,
    verifyViewAccess,
} from "../lib/access-middlewares.js";

export default function buildTableRoutes({
    router,
    verifyUser,
    verifyProject,
    tableController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    tableController: ITableController;
}) {
    /**
     * @openapi
     * /tables:
     *   get:
     *     summary: Get details of all tables
     *     responses:
     *       '200':
     *         description: A array containing table details
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/table'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/tables",
        verifyUser,
        verifyProject,
        verifyViewAccess,
        makeCallback(tableController.getTables)
    );

    /**
     * @openapi
     * /tables:
     *   post:
     *     summary: Create a new table
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               x:
     *                 type: number
     *               y:
     *                 type: number
     *             required:
     *               - name
     *               - x
     *               - y
     *     responses:
     *       '201':
     *         description: Table created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/tables",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.addTable)
    );

    /**
     * @openapi
     * /tables/{tableId}:
     *   get:
     *     summary: Get details of a single table
     *     parameters:
     *       - name: tableId
     *         in: path
     *         required: true
     *         description: id to find the table
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON containing table details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/table'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        verifyViewAccess,
        makeCallback(tableController.getTable)
    );

    /**
     * @openapi
     * /tables/{tableId}:
     *   put:
     *     summary: Change a table
     *     parameters:
     *       - name: tableId
     *         in: path
     *         required: true
     *         description: id to find the table
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
     *               description:
     *                 type: string
     *               x:
     *                 type: number
     *               y:
     *                 type: number
     *             required:
     *               - name
     *               - x
     *               - y
     *     responses:
     *       '201':
     *         description: Table updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.editTable)
    );

    /**
     * @openapi
     * /tables/{tableId}:
     *   delete:
     *     summary: Delete a table
     *     parameters:
     *       - name: tableId
     *         in: path
     *         required: true
     *         description: id to find the table
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Table deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.removeTable)
    );

    /**
     * @openapi
     * /tables/{tableId}:
     *   patch:
     *     summary: Change a table position
     *     parameters:
     *       - name: tableId
     *         in: path
     *         required: true
     *         description: id to find the table
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               x:
     *                 type: number
     *               y:
     *                 type: number
     *             required:
     *               - x
     *               - y
     *     responses:
     *       '200':
     *         description: Table position updated
     *       '500':
     *         description: An error occurred
     */
    router.patch(
        "/tables/:tableId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.changeTablePosition)
    );

    /**
     * @openapi
     * /tables/{tableId}/fields:
     *   post:
     *     summary: Create a new field in table
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               type:
     *                 type: string
     *               description:
     *                 type: string
     *               options:
     *                 type: array
     *                 items:
     *                   type: string
     *             required:
     *               - name
     *               - x
     *               - y
     *     responses:
     *       '201':
     *         description: Table created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/tables/:tableId/fields",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.addTableField)
    );

    /**
     * @openapi
     * /tables/{tableId}/fields:
     *   delete:
     *     summary: Delete a filed from table
     *     parameters:
     *       - name: tableId
     *         in: path
     *         required: true
     *         description: id to find the table
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Field deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/tables/:tableId/fields/:fieldId",
        verifyUser,
        verifyProject,
        verifyEditAccess,
        makeCallback(tableController.removeTableField)
    );

    return router;
}
