import { loadEnv, logger } from "@omniflow/common";
import { WebSocketServer } from "ws";

const { SOCKET_PORT } = loadEnv(["SOCKET_PORT"]);

const server = new WebSocketServer({ port: Number(SOCKET_PORT) });

enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

const rooms = new Map();

server.on("connection", (socket) => {
    logger.info("socket connected");
    socket.on("message", async (message) => {
        const data = JSON.parse(message.toString());

        switch (data.type) {
            case EventTypes.JOIN_ROOM:
                if (rooms.has(data.roomId)) {
                    rooms.set(data.roomId, [...rooms.get(data.roomId), socket]);
                } else {
                    rooms.set(data.roomId, [socket]);
                }
                break;
            case EventTypes.LEAVE_ROOM:
                if (rooms.has(data.roomId)) {
                    const currentMembers: any[] = rooms.get(data.roomId);

                    const newMembers = currentMembers.filter(
                        (a) => a != socket
                    );
                    rooms.set(data.roomId, newMembers);
                } else {
                    rooms.set(data.roomId, [socket]);
                }
                break;
            case EventTypes.MESSAGE:
                if (!rooms.has(data.roomId)) {
                    logger.error("socket: no room id");
                    return;
                }
                rooms.get(data.roomId).forEach((client) => {
                    client.send(JSON.stringify(data));
                });
                break;
            default:
                logger.error("Socket error: Invalid event type");
                break;
        }
    });
});
