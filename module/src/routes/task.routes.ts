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
    router.get(
        "/tasks",
        verifyUser,
        verifyProject,
        makeCallback(taskController.getTasks)
    );
    router.post(
        "/tasks",
        verifyUser,
        verifyProject,
        makeCallback(taskController.addTask)
    );
    router.get(
        "/tasks/:taskId",
        verifyUser,
        verifyProject,
        makeCallback(taskController.getTask)
    );

    return router;
}
