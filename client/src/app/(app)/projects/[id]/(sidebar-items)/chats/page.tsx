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
import React, { useEffect, useState } from "react";
import { SendHorizontal as SendIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Container from "@/components/layout/Container";
import { useAppSelector } from "@/redux/store";
import { Label } from "@/components/ui/label";
import { IUser } from "@/types/database";
import Avatar from "@/components/custom/Avatar";
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
        { from: IUser; content: string }[]
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
        socket.send(
            JSON.stringify({
                type: EventTypes.MESSAGE,
                content: data.message,
                from: user,
                roomId: projectId,
            })
        );
        form.reset();
    }

    useEffect(() => {
        console.log("joing room");
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

        return () => {
            socket.send(
                JSON.stringify({
                    type: EventTypes.LEAVE_ROOM,
                    roomId: projectId,
                })
            );
        };
    }, [socket, projectId]);

    socket.addEventListener("message", ({ data }) => {
        console.log(data);

        const message = JSON.parse(data);

        setMessages([
            ...messages,
            {
                from: message.from || "unknown",
                content: message.content,
            },
        ]);
    });

    return (
        <main className="w-full">
            <Container>
                <Heading>Chats</Heading>
                <section className="flex flex-col gap-2">
                    {messages.map((message, index) =>
                        user?.id == message.from.id ? (
                            <section className="me-0 ms-auto flex w-fit">
                                <section className="rounded-lg border border-primary-border bg-gradient-to-br from-primary-from to-primary-to p-2 text-primary-foreground">
                                    <p>{message.content}</p>
                                </section>
                            </section>
                        ) : (
                            <section className="me-auto ms-0 flex w-fit gap-2">
                                <Avatar
                                    size="sm"
                                    tooltip={true}
                                    name={message.from.name}
                                    src={message.from.avatar || ""}
                                />
                                <section className="rounded-lg border border-muted-foreground/10 bg-muted p-2">
                                    <p>{message.content}</p>
                                </section>
                            </section>
                        )
                    )}
                </section>
                <section>
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
                </section>
            </Container>
        </main>
    );
}
