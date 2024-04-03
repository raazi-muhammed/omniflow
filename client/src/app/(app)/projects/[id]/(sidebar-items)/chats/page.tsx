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
    const projectId = useAppSelector(
        (state) => state.projectReducer.projectData?.id
    );
    const user = useAppSelector((state) => state.authReducer.userData);

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const service = new ChatService();
        if (!projectId) return;
        makeApiCall(() => service.getMessages({ roomId: projectId }).exec(), {
            afterSuccess: (response: IResponse) => {
                setMessages(response.data);
            },
        });
    }, [projectId]);

    useEffect(() => {
        try {
            if (!projectId) {
                toast({ description: "no project id found" });
                return;
            }

            socket.send(
                JSON.stringify({
                    type: EventTypes.JOIN_ROOM,
                    roomId: projectId,
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
                        roomId: projectId,
                    })
                );
            } catch (error) {
                toast({ description: "failed" });
            }
        };
    }, [socket, projectId, socket.readyState]);

    socket.addEventListener("message", ({ data }) => {
        const message = JSON.parse(data);
        setMessages([
            ...messages,
            {
                from: message.from || "unknown",
                content: message.content,
                createdAt: new Date(),
            },
        ]);
    });

    return (
        <div className="relative w-full">
            <main className="h-screen-without-navbar w-full overflow-auto">
                <Container>
                    <Heading>Chats</Heading>
                    <Messages messages={messages} userId={user?.id || "as"} />
                    <section className="absolute bottom-4 left-0 right-0 w-full">
                        <Container>
                            {projectId && user ? (
                                <MessageSender
                                    projectId={projectId}
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
