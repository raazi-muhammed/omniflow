"use client";

import { toast } from "@/components/ui/use-toast";

import Heading from "@/components/custom/Heading";
import React, { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { useAppSelector } from "@/redux/store";
import { EventTypes, IMessage } from "@/types/database";
import { ChatService } from "@/services/api/chat.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";
import Messages from "./_components/Messages";
import MessageSender from "./_components/MessageSender";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
if (!SOCKET_URL) throw new Error("ENV NOT FOUND: socket url not found");

const socket = new WebSocket(SOCKET_URL);

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
    }, [project]);

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
            toast({ description: "room joined" });
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
                toast({ description: "room left" });
            } catch (error) {
                toast({ description: "failed" });
            }
        };
    }, [project]);

    socket.addEventListener("message", ({ data }) => {
        const message = JSON.parse(data);
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
