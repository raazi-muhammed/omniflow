import { logger } from "@omniflow/common";
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 4040 });

server.on("connection", (socket) => {
    logger.info("socket connected");
    socket.on("message", (message) => {
        console.log(message.toString());

        server.clients.forEach((client) => {
            client.send(`from client ${message}`);
        });
        socket.send(`from server ${message}`);
    });
});
