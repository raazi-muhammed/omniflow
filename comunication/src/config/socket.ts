import { loadEnv, logger, validateBody } from "@omniflow/common";
import { WebSocketServer } from "ws";
import { messageUseCases } from "../use-cases/index.js";
import redis from "redis";

const { REDIS_URL, SOCKET_PORT } = loadEnv(["REDIS_URL", "SOCKET_PORT"]);

const server = new WebSocketServer({ port: Number(SOCKET_PORT) });

enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

const redisClient = redis.createClient({
    url: REDIS_URL,
});
redisClient
    .connect()
    .then((res) => {
        console.log("Redist connected");
    })
    .catch((err) => {
        console.log(err);
    });

const rooms = new Map();

server.on("connection", (socket) => {
    logger.info("socket connected");
    socket.on("message", async (message) => {
        const data = JSON.parse(message.toString());
        console.log("room", await data.roomId);

        switch (data.type) {
            case EventTypes.JOIN_ROOM:
                redisClient.set(data.roomId, "socket");
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
                validateBody(data, ["roomId", "content", "from"]);
                messageUseCases.addMessage(data);

                console.log("reddist", await redisClient.get(data.roomId));

                rooms.get(data.roomId).forEach((client) => {
                    client.send(JSON.stringify(data));
                });
                break;
        }
    });
});
