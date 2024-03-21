import { logger } from "@omniflow/common";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow Module Service Docs",
            version: "1.0.0",
        },
        components: {
            schemas: {
                module: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                            require: true,
                        },
                        description: {
                            type: "string",
                            required: true,
                        },
                        projectId: {
                            type: "string",
                            required: true,
                        },
                        priority: {
                            type: "string",
                        },
                        startDate: {
                            type: "string",
                        },
                        dueDate: {
                            type: "string",
                        },
                        parentModule: {
                            type: "string",
                        },
                        deletedAt: {
                            type: "string",
                        },
                    },
                },
                task: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                            require: true,
                        },
                        description: {
                            type: "string",
                            required: true,
                        },
                        projectId: {
                            type: "string",
                            required: true,
                        },
                        priority: {
                            type: "string",
                        },
                        startDate: {
                            type: "string",
                        },
                        dueDate: {
                            type: "string",
                        },
                        module: {
                            type: "string",
                        },
                        deletedAt: {
                            type: "string",
                        },
                        status: {
                            type: "string",
                        },
                    },
                },
            },
            securitySchemes: {
                userAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                projectAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                userAuth: [],
                projectAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/api/module/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api/module/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(`Docs available\t: http://localhost:${port}/api/module/docs`);
}

export default swaggerDocs;
