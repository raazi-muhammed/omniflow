import { loadEnv, logger } from "@omniflow/common";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const { PORT } = loadEnv(["PORT"]);

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow DB Design Service Docs",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/db-design`,
            },
        ],
        components: {
            schemas: {
                table: {
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
                        x: {
                            type: "number",
                            required: true,
                        },
                        y: {
                            type: "number",
                            required: true,
                        },
                    },
                },
                relation: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        projectId: {
                            type: "string",
                            require: true,
                        },
                        to: {
                            type: "string",
                            required: true,
                        },
                        from: {
                            type: "string",
                            required: true,
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
    app.use(
        "/api/db-design/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec)
    );
    app.get("/api/db-design/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(
        `Docs available\t: http://localhost:${port}/api/db-design/docs`
    );
}

export default swaggerDocs;
