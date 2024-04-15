import client from "prom-client";
import { Express } from "express";
import { logger } from "@omniflow/common";
import responseTime from "response-time";

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "Tells how much time is taken by req and rs",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 50, 100, 200, 500, 800, 1000, 2000],
});
const totalRequestCounter = new client.Counter({
    name: "total_req_counter",
    help: "Tells totals req",
});

export const metricMiddleware = () => {
    return responseTime((req, res, time) => {
        totalRequestCounter.inc();
        reqResTime
            .labels({
                method: req.method,
                route: req.url,
                status_code: req.statusCode,
            })
            .observe(time);
    });
};

export function metrics(app: Express, port: number) {
    app.get("/metrics", async (req, res) => {
        res.setHeader("Content-Type", client.register.contentType);
        const metrics = await client.register.metrics();
        res.send(metrics);
    });

    logger.info(`Logs available\t\t: http://localhost:${port}/metrics`);
}
