import {
    IVerifyProjectMiddleware,
    IVerifyUserMiddleware,
    makeCallback,
} from "@omniflow/common";
import { Router } from "express";
import { ITaskController } from "../interfaces/controller.interface.js";

export default function buildTaskRoutes({
    router,
    verifyUser,
    verifyProject,
    taskController,
}: {
    router: Router;
    verifyUser: IVerifyUserMiddleware;
    verifyProject: IVerifyProjectMiddleware;
    taskController: ITaskController;
}) {
    /**
     * @openapi
     * /tasks:
     *   get:
     *     summary: Get details of all tasks
     *     responses:
     *       '200':
     *         description: A array of all tasks
     *         content:
     *           application/json:
     *             type: array
     *             schema:
     *               $ref: '#/components/schemas/task'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/tasks",
        verifyUser,
        verifyProject,
        makeCallback(taskController.getTasks)
    );

    /**
     * @openapi
     * /tasks:
     *   post:
     *     summary: Create a new task
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               priority:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '201':
     *         description: Task created
     *       '500':
     *         description: An error occurred
     */
    router.post(
        "/tasks",
        verifyUser,
        verifyProject,
        makeCallback(taskController.addTask)
    );

    /**
     * @openapi
     * /tasks/{taskId}:
     *   get:
     *     summary: Get details on one tasks
     *     parameters:
     *       - name: taskId
     *         in: path
     *         required: true
     *         description: id to find the tasks
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: A JSON of an task
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/task'
     *       '500':
     *         description: An error occurred
     */
    router.get(
        "/tasks/:taskId",
        verifyUser,
        verifyProject,
        makeCallback(taskController.getTask)
    );

    /**
     * @openapi
     * /tasks:
     *   put:
     *     summary: Updates a task
     *     parameters:
     *       - name: taskId
     *         in: path
     *         required: true
     *         description: id to find the task
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
     *               priority:
     *                 type: string
     *               startDate:
     *                 type: string
     *               dueDate:
     *                 type: string
     *               description:
     *                 type: string
     *             required:
     *               - name
     *               - method
     *               - route
     *     responses:
     *       '204':
     *         description: Task updated
     *       '500':
     *         description: An error occurred
     */
    router.put(
        "/tasks/:taskId",
        verifyUser,
        verifyProject,
        makeCallback(taskController.editTask)
    );

    /**
     * @openapi
     * /tasks/{taskId}:
     *   delete:
     *     summary: Delete an task
     *     parameters:
     *       - name: taskId
     *         in: path
     *         required: true
     *         description: id to find the task
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Endpoint deleted
     *       '500':
     *         description: An error occurred
     */
    router.delete(
        "/tasks/:taskId",
        verifyUser,
        verifyProject,
        makeCallback(taskController.deleteTask)
    );

    /**
     * @openapi
     * /tasks:
     *   patch:
     *     summary: Update task status
     *     parameters:
     *       - name: taskId
     *         in: path
     *         required: true
     *         description: id to find the task
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               status:
     *                 type: string
     *             required:
     *               - status
     *     responses:
     *       '204':
     *         description: Task status changed
     *       '500':
     *         description: An error occurred
     */
    router.patch(
        "/tasks/:taskId/status",
        verifyUser,
        verifyProject,
        makeCallback(taskController.changeTaskStatus)
    );

    /**
     * @openapi
     * /tasks:
     *   patch:
     *     summary: Change assignee of an task
     *     parameters:
     *       - name: taskId
     *         in: path
     *         required: true
     *         description: id to find the task
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               assignee:
     *                 type: Object
     *             required:
     *               - assignee
     *     responses:
     *       '204':
     *         description: Assignee changed
     *       '500':
     *         description: An error occurred
     */
    router.patch(
        "/tasks/:taskId/assignee",
        verifyUser,
        verifyProject,
        makeCallback(taskController.changeTaskAssignee)
    );

    return router;
}
