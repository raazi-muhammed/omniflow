import Avatar from "@/components/custom/Avatar";
import { Label } from "@/components/ui/label";
import { IMessage, MessageType } from "@/types/database";
import { File, Loader2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function Messages({
    messages,
    userName,
}: {
    messages: IMessage[];
    userName: string;
}) {
    useEffect(() => {
        const divRef = document.querySelector("#messages-chat");
        if (divRef) {
            divRef.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <section className="flex flex-col gap-2">
            {messages.map((message, index) =>
                userName == message.from.username ? (
                    <motion.section
                        key={index}
                        initial={{ scale: 0.5, x: 20 }}
                        animate={{ scale: 1, x: 0 }}
                        className="me-0 ms-auto grid w-fit">
                        <section className="ms-auto w-fit rounded-lg border border-primary-border bg-gradient-to-br from-primary-from to-primary-to p-2 text-primary-foreground">
                            {message.file ? (
                                <>
                                    {message.type == MessageType.IMAGE ? (
                                        <img
                                            className="mb-2 h-56 min-w-20 rounded"
                                            src={message.file.url}
                                            alt={message.file.name}
                                        />
                                    ) : (
                                        <Link href={message.file.url}>
                                            <div className="mb-2 flex max-w-80 place-items-center gap-2 overflow-hidden rounded bg-black bg-opacity-30 p-3">
                                                <File size="1.3em" />
                                                <p className="my-auto w-full truncate">
                                                    {message.file.name}
                                                </p>
                                            </div>
                                        </Link>
                                    )}
                                </>
                            ) : null}
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
                                    {moment(message.createdAt).fromNow()}
                                </Label>
                            )}
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key={index}
                        initial={{ scale: 0.5, x: -20 }}
                        animate={{ scale: 1, x: 0 }}
                        className="me-auto ms-0 flex w-fit gap-2">
                        <Avatar
                            size="sm"
                            tooltip={true}
                            name={message.from.name}
                            src={message.from.avatar || ""}
                        />
                        <div>
                            <section className="w-fit rounded-lg border border-muted-foreground/10 bg-muted p-2">
                                {message.file ? (
                                    <>
                                        {message.type == MessageType.IMAGE ? (
                                            <img
                                                className="mb-2 h-56 min-w-20 rounded"
                                                src={message.file.url}
                                                alt={message.file.name}
                                            />
                                        ) : (
                                            <Link href={message.file.url}>
                                                <div className="mb-2 flex max-w-80 place-items-center gap-2 overflow-hidden rounded bg-black bg-opacity-30 p-3">
                                                    <File size="1.3em" />
                                                    <p className="my-auto w-full truncate">
                                                        {message.file.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                    </>
                                ) : null}
                                <p>{message.content}</p>
                            </section>
                            <Label className="mt-1 flex text-[.6em]">
                                {moment(message.createdAt).fromNow()}
                            </Label>
                        </div>
                    </motion.section>
                )
            )}
            <div id="messages-chat" className="h-20" />
        </section>
    );
}
