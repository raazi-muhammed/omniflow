"use client";

import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";

export default function BodyComponent({
    bodyData,
}: {
    bodyData: string | undefined;
}) {
    const [code, setCode] = useState(
        bodyData ||
            `{
    "key": "value"
}`
    );

    return (
        <div>
            <CodeEditor
                value={code}
                language="json"
                placeholder="Please enter your body code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                className="mt-2 rounded-lg border bg-card"
                style={{
                    backgroundColor: "#0F0B0B",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                }}
            />
        </div>
    );
}
("");
