import { NextFunction, Request, Response } from "express";

export function verifyViewAccess(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // @ts-ignore
    const access = req.currentProject.access.dbDesign;
    if (access > 0) next();
    else {
        res.status(402).json({
            message: "You don't have access to this section",
        });
    }
}
export function verifyEditAccess(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // @ts-ignore
    const access = req.currentProject.access.dbDesign;
    if (access > 1) next();
    else {
        res.status(402).json({
            message: "You don't have sufficient access",
        });
    }
}
