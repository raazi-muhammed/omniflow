import { adaptRequest } from "@omniflow/common";
import IToken from "../interfaces/token.interface.js";
import { NextFunction, Request, Response } from "express";

export default function buildVerifyUserMiddleware({
    token,
}: {
    token: IToken;
}) {
    return async (expressReq: Request, res: Response, next: NextFunction) => {
        try {
            const req = adaptRequest(expressReq);

            const tokenData = `Bearer ${req.cookies["__omniflow-user-token"]}`;

            token.validate(tokenData);

            const decodedTokenData = await token.verify(tokenData);

            if (!decodedTokenData) throw new Error("Invalid token data");

            req.body.currentUser = decodedTokenData;

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error?.message || "Internal server error",
            });
        }
    };
}

export type IVerifyMiddleware = ReturnType<typeof buildVerifyUserMiddleware>;
