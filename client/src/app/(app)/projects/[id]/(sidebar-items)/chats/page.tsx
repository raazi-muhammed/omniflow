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
import React, { useEffect } from "react";
import { SendHorizontal as SendIcon } from "lucide-react";
const socket = new WebSocket("ws://localhost:4040");

export default function Chats() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data.message);

        socket.send(data.message);
    }

    socket.addEventListener("message", ({ data }) => {
        console.log(data);
    });

    return (
        <main className="w-full">
            <Heading>Chats</Heading>

            <section className="p-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="relative">
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
        </main>
    );
}
