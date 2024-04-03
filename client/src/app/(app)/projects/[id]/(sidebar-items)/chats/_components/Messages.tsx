import Avatar from "@/components/custom/Avatar";
import { Label } from "@/components/ui/label";
import { IMessage } from "@/types/database";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useEffect } from "react";

export default function Messages({
    messages,
    userId,
}: {
    messages: IMessage[];
    userId: string;
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
            {messages.map((message) =>
                userId == message.from.id ? (
                    <section className="me-0 ms-auto grid w-fit">
                        <section className="ms-auto w-fit rounded-lg border border-primary-border bg-gradient-to-br from-primary-from to-primary-to p-2 text-primary-foreground">
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
                            <section className="w-fit rounded-lg border border-muted-foreground/10 bg-muted p-2">
                                <p>{message.content}</p>
                            </section>
                            <Label className="mt-1 flex text-[.6em]">
                                {moment(message.createdAt).fromNow()}
                            </Label>
                        </div>
                    </section>
                )
            )}

            <div id="messages-chat" className="h-20" />
        </section>
    );
}
