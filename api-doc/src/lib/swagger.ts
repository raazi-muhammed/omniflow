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
                endpoint: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                            require: true,
                        },
                        route: {
                            type: "string",
                            required: true,
                        },
                        method: {
                            type: "string",
                            required: true,
                        },
                        summary: {
                            type: "string",
                        },
                        body: {
                            type: "string",
                        },
                        projectId: {
                            type: "string",
                            required: true,
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/endpoint.routes.ts"],
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
