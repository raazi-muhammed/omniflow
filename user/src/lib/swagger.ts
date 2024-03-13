import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Omniflow User Service Docs",
            version: "1.0.0",
        },
        components: {
            schemas: {
                user: {
                    properties: {
                        id: {
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
    apis: ["./src/routers/auth.routes.ts", "./src/routers/user.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/api/user/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api/user/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Docs available\t\t: http://localhost:${port}/api/user/docs`);
}

export default swaggerDocs;
