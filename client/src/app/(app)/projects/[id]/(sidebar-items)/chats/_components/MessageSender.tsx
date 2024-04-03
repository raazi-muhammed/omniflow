import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatService } from "@/services/api/chat.service";
import { makeApiCall } from "@/lib/apicaller";
import { EventTypes } from "../page";
import { z } from "zod";
import { IMessage, IUser } from "@/types/database";
import { toast } from "@/components/ui/use-toast";
import { SendIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
    message: z.string().min(1, {
        message: "message must be at least 2 characters.",
    }),
    image: z.any(),
});

export default function MessageSender({
    projectId,
    user,
    messages,
    setMessages,
    socket,
}: {
    socket: WebSocket;
    projectId: string;
    user: IUser;
    messages: IMessage[];
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values.message);
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

        const data = new FormData();
        data.append("content", values.message);

        if (values.image) {
            console.log(values.image[0]);
            data.append("avatar", values.image[0]);
        }

        setMessages([
            ...messages,
            {
                from: user || "unknown",
                content: values.message,
                createdAt: new Date(),
                isLoading: true,
            },
        ]);
        const service = new ChatService();
        makeApiCall(
            () => service.addMessage({ roomId: projectId, data }).exec(),
            {
                afterSuccess: () => {
                    socket.send(
                        JSON.stringify({
                            type: EventTypes.MESSAGE,
                            content: values.message,
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative mt-4 flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="muted" className="my-auto">
                            +
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({}) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...form.register("image")}
                                            type="file"
                                            accept="images/*"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </PopoverContent>
                </Popover>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="sr-only">Message</FormLabel>
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
    );
}
