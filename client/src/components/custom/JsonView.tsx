"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function JsonView({
    className,
    data,
}: {
    data: string | undefined;
    className?: string;
}) {
    return (
        <CodeEditor
            value={data}
            language="json"
            placeholder="Please enter your body code."
            padding={15}
            className={cn("mt-2 rounded-lg bg-card", className)}
            disabled={true}
            style={{
                backgroundColor: "#0F0B0B",
                fontSize: "0.875rem",
                fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />
    );
}
