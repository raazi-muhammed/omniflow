import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow API Docs Service Docs",
            version: "1.0.0",
        },
        components: {
            schemas: {
                user: {
                    properties: {
                        _id: {
                            type: "string",
                            require: true,
                        },
                        username: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        avatar: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routers/endpoint.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/api/api-doc/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api/api-doc/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(
        `Docs available\t\t: http://localhost:${port}/api/api-doc/docs`
    );
}

export default swaggerDocs;
