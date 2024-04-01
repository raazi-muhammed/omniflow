import { logger } from "@omniflow/common";
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 4040 });

enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

const rooms = new Map();

server.on("connection", (socket) => {
    logger.info("socket connected");
    socket.on("message", (message) => {
        const data = JSON.parse(message.toString());
        console.log("room", data.roomId);

        switch (data.type) {
            case EventTypes.JOIN_ROOM:
                if (rooms.has(data.roomId)) {
                    rooms.set(data.roomId, [...rooms.get(data.roomId), socket]);
                } else {
                    rooms.set(data.roomId, [socket]);
                }
                break;
            case EventTypes.LEAVE_ROOM:
                rooms.delete(data.roomId);
                break;
            case EventTypes.MESSAGE:
                if (!rooms.has(data.roomId)) {
                    logger.error("no room id");
                    return;
                }
                rooms.get(data.roomId).forEach((client) => {
                    client.send(JSON.stringify(data));
                });
                break;
        }
    });
});
