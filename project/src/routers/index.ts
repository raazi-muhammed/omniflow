import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import projectControllers from "../controllers/index.js";
import buildProjectRoute from "./project.routes.js";
import {
    verifyUserMiddleware,
    verifyProjectMiddleware,
    IRequest,
    adaptRequest,
    NotFoundError,
    token,
} from "@omniflow/common";

const middle = async (
    expressReq: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const req: IRequest = adaptRequest(expressReq);

        const tokenData = req.headers.authorization;
        if (!tokenData) throw new NotFoundError("Token not found");
        token.validate(tokenData);

        const decodedTokenData = await token.verify(tokenData);
        if (!decodedTokenData) new Error("Invalid token data");

        // @ts-ignore
        expressReq.currentUser = decodedTokenData
            ? decodedTokenData
            : undefined;

        next();
    } catch (error) {
        next(error);
    }
};

const projectRoutes = buildProjectRoute({
    router,
    verifyUserMiddleware: middle,
    verifyProjectMiddleware,
    controllers: projectControllers,
});

export default projectRoutes;
