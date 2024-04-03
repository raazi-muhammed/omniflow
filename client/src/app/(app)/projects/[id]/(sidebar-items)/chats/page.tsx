"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    message: z.string().min(1, {
        message: "message must be at least 2 characters.",
    }),
});

import Heading from "@/components/custom/Heading";
import React, { memo, useEffect, useState } from "react";
import { Loader2, SendHorizontal as SendIcon } from "lucide-react";
import Container from "@/components/layout/Container";
import { useAppSelector } from "@/redux/store";
import { IUser } from "@/types/database";
import Avatar from "@/components/custom/Avatar";
import { ChatService } from "@/services/api/chat.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";
import { Label } from "@/components/ui/label";
import moment from "moment";
const socket = new WebSocket("ws://localhost:4040");

enum EventTypes {
    JOIN_ROOM = "JOIN_ROOM",
    LEAVE_ROOM = "LEAVE_ROOM",
    MESSAGE = "MESSAGE",
}

export default function Chats() {
    const projectId = useAppSelector(
        (state) => state.projectReducer.projectData?.id
    );
    const user = useAppSelector((state) => state.authReducer.userData);

    const [messages, setMessages] = useState<
        {
            from: IUser;
            content: string;
            createdAt: Date;
            isLoading?: boolean;
        }[]
    >([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data.message);
        if (!user) {
            toast({ description: "user detail not found" });
            return;
        }
        if (!projectId) {
            toast({
                description: "Invalid room",
            });
            return;
        }

        setMessages([
            ...messages,
            {
                from: user || "unknown",
                content: data.message,
                createdAt: new Date(),
                isLoading: true,
            },
        ]);
        const service = new ChatService();
        makeApiCall(
            () =>
                service
                    .addMessage({ roomId: projectId, content: data.message })
                    .exec(),
            {
                afterSuccess: () => {
                    socket.send(
                        JSON.stringify({
                            type: EventTypes.MESSAGE,
                            content: data.message,
                            roomId: projectId,
                            from: user,
                        })
                    );
                    setMessages((m) => {
                        m.pop();
                        return m;
                    });
                },
            }
        );

        form.reset();
    }

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
        const divRef = document.querySelector("#messages-chat");
        if (divRef) {
            divRef.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messages]);

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
                    <section className="flex flex-col gap-2">
                        {messages.map((message) =>
                            user?.id == message.from.id ? (
                                <section className="me-0 ms-auto grid w-fit">
                                    <section className="rounded-lg border border-primary-border bg-gradient-to-br from-primary-from to-primary-to p-2 text-primary-foreground">
                                        <p>{message.content}</p>
                                    </section>
                                    <div className="me-0 ms-auto mt-1 flex gap-1 align-middle text-muted-foreground">
                                        {message?.isLoading ? (
                                            <Loader2
                                                size=".5em"
                                                className="my-auto animate-spin"
                                            />
                                        ) : (
                                            <Label className="flex text-end text-[.6em]">
                                                {moment(
                                                    message.createdAt
                                                ).fromNow()}
                                            </Label>
                                        )}
                                    </div>
                                </section>
                            ) : (
                                <section className="me-auto ms-0 flex w-fit gap-2">
                                    <Avatar
                                        size="sm"
                                        tooltip={true}
                                        name={message.from.name}
                                        src={message.from.avatar || ""}
                                    />
                                    <div>
                                        <section className="rounded-lg border border-muted-foreground/10 bg-muted p-2">
                                            <p>{message.content}</p>
                                        </section>
                                        <Label className="mt-1 flex text-[.6em]">
                                            {moment(
                                                message.createdAt
                                            ).fromNow()}
                                        </Label>
                                    </div>
                                </section>
                            )
                        )}

                        <div id="messages-chat" className="h-20" />
                    </section>
                    <section className="absolute bottom-4 left-0 right-0 w-full">
                        <Container>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="relative mt-4">
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">
                                                    Message
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="w-full rounded-full"
                                                        placeholder="message..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="absolute bottom-0 right-1 top-0 flex align-middle">
                                        <Button
                                            type="submit"
                                            size="sm"
                                            className="my-auto flex gap-2">
                                            send
                                            <SendIcon size="1em" />
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </Container>
                    </section>
                </Container>
            </main>
        </div>
    );
}
