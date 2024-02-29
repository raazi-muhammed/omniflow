import { Request } from "express";

export default function adaptRequest(req: Request) {
    return Object.freeze({
        path: req.path,
        method: req.method,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        cookies: req.cookies,
    });
}

export type IRequest = ReturnType<typeof adaptRequest>;
