"use client";

import { toast } from "@/components/ui/use-toast";

import Heading from "@/components/custom/Heading";
import React, { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { useAppSelector } from "@/redux/store";
import { IMessage } from "@/types/database";
import { ChatService } from "@/services/api/chat.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";
import Messages from "./_components/Messages";
import MessageSender from "./_components/MessageSender";
const socket = new WebSocket("ws://localhost:4040");

export enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

export default function Chats() {
    const project = useAppSelector((state) => state.projectReducer.projectData);
    const user = useAppSelector((state) => state.authReducer.userData);

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const service = new ChatService();
        if (!project?.id) return;
        makeApiCall(() => service.getMessages({ roomId: project.id }).exec(), {
            afterSuccess: (response: IResponse) => {
                setMessages(response.data);
            },
        });
    }, [project?.id]);

    useEffect(() => {
        try {
            if (!project?.id) {
                toast({ description: "no project id found" });
                return;
            }

            socket.send(
                JSON.stringify({
                    type: EventTypes.JOIN_ROOM,
                    roomId: project.id,
                })
            );
        } catch (error) {
            toast({ description: "failed" });
        }
        return () => {
            try {
                socket.send(
                    JSON.stringify({
                        type: EventTypes.LEAVE_ROOM,
                        roomId: project?.id,
                    })
                );
            } catch (error) {
                toast({ description: "failed" });
            }
        };
    }, [socket, project?.id, socket.readyState]);

    socket.addEventListener("message", ({ data }) => {
        const message = JSON.parse(data);
        console.log("message recived", message);

        setMessages([...messages, message.content]);
    });

    return (
        <div className="relative w-full">
            <main className="h-screen-without-navbar w-full overflow-auto">
                <Container>
                    <Heading>{project ? project.title : "Chats"}</Heading>
                    <Messages
                        messages={messages}
                        userName={user?.username || ""}
                    />
                    <section className="absolute bottom-4 left-0 right-0 w-full">
                        <Container>
                            {project && user ? (
                                <MessageSender
                                    projectId={project.id}
                                    user={user}
                                    messages={messages}
                                    setMessages={setMessages}
                                    socket={socket}
                                />
                            ) : null}
                        </Container>
                    </section>
                </Container>
            </main>
        </div>
    );
}
