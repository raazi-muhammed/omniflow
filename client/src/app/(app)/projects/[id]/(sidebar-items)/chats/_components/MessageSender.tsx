import React from "react";
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

const FormSchema = z.object({
    message: z.string().min(1, {
        message: "message must be at least 2 characters.",
    }),
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative mt-4">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
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
