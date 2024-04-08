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
import { IMessage, IUser, MessageType } from "@/types/database";
import { toast } from "@/components/ui/use-toast";
import { File as FileIcon, Image as ImageIcon, SendIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IResponse } from "@/services/api/utils";
import Link from "next/link";
import AnimateButton from "@/components/animated/AnimateButton";

const FormSchema = z.object({
    message: z.string().min(1, {
        message: "message must be at least 2 characters.",
    }),
    image: z.any(),
    file: z.any(),
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
    const [fileMenuOpen, setFileMenuOpen] = useState(false);

    const [preview, setPreview] = useState<{
        type: "img" | "file";
        url: string;
        name: string;
    } | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: "",
            image: "",
            file: "",
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

        let dataToPreview: IMessage = {
            from: user || "unknown",
            content: values.message,
            type: MessageType.TEXT_ONLY,
            createdAt: new Date(),
            isLoading: true,
        };

        if (values.image?.length) {
            console.log(values.image[0]);
            data.append("file", values.image[0]);
            dataToPreview.type = MessageType.IMAGE;
            if (preview) {
                dataToPreview.file = preview;
            }
        }
        if (values.file?.length) {
            console.log(values.file[0]);
            data.append("file", values.file[0]);
            dataToPreview.type = MessageType.FILE;
            if (preview) {
                dataToPreview.file = preview;
            }
        }

        setMessages([...messages, dataToPreview]);
        setPreview(null);
        const service = new ChatService();
        makeApiCall(
            () => service.addMessage({ roomId: projectId, data }).exec(),
            {
                afterSuccess: (response: IResponse) => {
                    setMessages((m) => {
                        m.pop();
                        return m;
                    });
                    socket.send(
                        JSON.stringify({
                            type: EventTypes.MESSAGE,
                            roomId: response.data.roomId,
                            content: response.data,
                        })
                    );
                },
                afterError: () => {
                    toast({ description: "Message sending failed" });
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
                <Popover
                    open={fileMenuOpen}
                    onOpenChange={(e) => setFileMenuOpen(e)}>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="muted" className="mt-auto">
                            +
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="m-0 grid h-16 w-fit grid-cols-2 gap-3 p-2">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({}) => (
                                <FormItem className="flex gap-2 rounded px-2 py-1 hover:bg-muted">
                                    <AnimateButton>
                                        <FormLabel className="flex gap-2">
                                            <FileIcon className="my-auto" />
                                            <span className="my-auto text-sm">
                                                File
                                            </span>
                                        </FormLabel>
                                    </AnimateButton>
                                    <FormControl>
                                        <Input
                                            className="sr-only"
                                            {...form.register("file")}
                                            onChange={(e) => {
                                                form.register("file").onChange(
                                                    e
                                                );
                                                if (e.target.files) {
                                                    setPreview({
                                                        type: "file",
                                                        url: URL.createObjectURL(
                                                            e.target.files[0]
                                                        ),
                                                        name: e.target.files[0]
                                                            .name,
                                                    });
                                                }
                                                setFileMenuOpen(false);
                                            }}
                                            type="file"
                                            accept="images/*"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({}) => (
                                <FormItem className="flex gap-2 rounded px-2 py-1 hover:bg-muted">
                                    <AnimateButton>
                                        <FormLabel className="flex gap-2">
                                            <ImageIcon className="my-auto" />
                                            <span className="my-auto text-sm">
                                                Image
                                            </span>
                                        </FormLabel>
                                    </AnimateButton>
                                    <FormControl>
                                        <Input
                                            className="sr-only"
                                            {...form.register("image")}
                                            onChange={(e) => {
                                                form.register("image").onChange(
                                                    e
                                                );
                                                console.log(e.target.files);
                                                if (e.target.files) {
                                                    setPreview({
                                                        type: "img",
                                                        url: URL.createObjectURL(
                                                            e.target.files[0]
                                                        ),
                                                        name: e.target.files[0]
                                                            .name,
                                                    });
                                                }
                                                setFileMenuOpen(false);
                                            }}
                                            type="file"
                                            accept="images/*"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </PopoverContent>
                </Popover>
                <div className="w-full rounded-lg border bg-card">
                    {preview ? (
                        <section className="p-2">
                            {preview.type == "img" ? (
                                <Link href={preview.url}>
                                    <img
                                        className="h-44 rounded"
                                        src={preview.url}
                                        alt={preview.name}
                                    />
                                </Link>
                            ) : (
                                <Link href={preview.url}>
                                    <div className="flex w-fit gap-2 rounded border bg-muted p-4">
                                        <FileIcon size="1.3em" />
                                        <p className="flex">{preview.name}</p>
                                    </div>
                                </Link>
                            )}
                        </section>
                    ) : null}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="sr-only">
                                    Message
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="h-10 min-h-10 w-full border-none bg-transparent"
                                        placeholder="message..."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <AnimateButton>
                    <Button
                        type="submit"
                        size="sm"
                        className="mb-1 mt-auto flex">
                        <SendIcon size="1em" />
                    </Button>
                </AnimateButton>
            </form>
        </Form>
    );
}
