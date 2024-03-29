import { loadEnv, logger } from "@omniflow/common";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const { PORT } = loadEnv(["PORT"]);

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow Communication Service Docs",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/communication`,
            },
        ],
        components: {
            schemas: {
                meeting: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                            require: true,
                        },
                        agenda: {
                            type: "string",
                            required: true,
                        },
                        notes: {
                            type: "string",
                            required: true,
                        },
                        startDate: {
                            type: "string",
                            required: true,
                        },
                        endDate: {
                            type: "string",
                        },
                        projectId: {
                            type: "string",
                            required: true,
                        },
                        meetingLink: {
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
        "/api/communication/docs",
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec)
    );
    app.get("/api/communication/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(
        `Docs available\t: http://localhost:${port}/api/communication/docs`
    );
}

export default swaggerDocs;
