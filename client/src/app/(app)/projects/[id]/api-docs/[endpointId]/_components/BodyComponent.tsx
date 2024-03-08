"use client";

import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function BodyComponent() {
    const [code, setCode] = useState(`{
    "key": "value"
}`);
    return (
        <div>
            <CodeEditor
                value={code}
                language="json"
                placeholder="Please enter your body code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                className="mt-2 rounded-lg border bg-gradient-to-br from-card-from to-card-to"
                style={{
                    fontSize: "0.875rem",
                    fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
            />
        </div>
    );
}
("");
