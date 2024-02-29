import { Request, Response } from "express";
import adaptRequest from "./adapt-request.js";
import { IResponse } from "../interfaces/response.interface.js";

export default function makeCallback(controller: Function) {
    return async (req: Request, res: Response) => {
        const httpRequest = adaptRequest(req);
        try {
            const response = (await controller(httpRequest)) as IResponse;
            res.status(response.statusCode).header(response.headers).json({
                success: true,
                message: response.message,
                data: response.data,
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message || "Internal server error",
            });
        }
    };
}
