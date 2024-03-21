import { logger } from "@omniflow/common";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow Project Service Docs",
            version: "1.0.0",
        },
        components: {
            schemas: {
                project: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        title: {
                            type: "string",
                            require: true,
                        },
                        description: {
                            type: "string",
                            required: true,
                        },
                        priority: {
                            type: "string",
                            required: true,
                        },
                        startDate: {
                            type: "string",
                        },
                        dueDate: {
                            type: "string",
                        },
                        members: {
                            type: "string",
                        },
                        deletedAt: {
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
    apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/api/project/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api/project/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(
        `Docs available\t\t: http://localhost:${port}/api/project/docs`
    );
}

export default swaggerDocs;
