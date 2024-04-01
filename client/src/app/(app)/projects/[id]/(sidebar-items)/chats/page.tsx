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
    FormMessage,
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
const socket = new WebSocket("ws://localhost:4040");

export default function Chats() {
    const [messages, setMessages] = useState([
        {
            from: "Raazi",
            to: "Elon",
            message: "hello, how are you",
        },
        {
            from: "Raazi",
            to: "Elon",
            message: "hello, how are you",
        },
    ]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data.message);
        socket.send(data.message);
        form.reset();
    }

    socket.addEventListener("message", ({ data }) => {
        console.log(data);
        setMessages((msg) => [
            ...messages,
            {
                from: "Raazi",
                to: "hooi",
                message: data,
            },
        ]);
    });

    return (
        <main className="w-full">
            <Container>
                <Heading>Chats</Heading>
                <section className="flex flex-col gap-2">
                    {messages.map((message, index) =>
                        index % 2 == 0 ? (
                            <section className="me-auto ms-0 w-fit rounded-lg border border-muted-foreground/10 bg-muted p-2">
                                <p>{message.message}</p>
                            </section>
                        ) : (
                            <section className="me-0 ms-auto w-fit rounded-lg border border-primary-border bg-gradient-to-br from-primary-from to-primary-to p-2 text-primary-foreground">
                                <p>{message.message}</p>
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
