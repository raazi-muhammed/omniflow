"use client";

import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import { addEndpointBody } from "@/services/endpoints.service";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AddBodyForm({
    endpointId,
    bodyData,
}: {
    endpointId: string;
    bodyData: string | undefined;
}) {
    const [code, setCode] = useState(
        bodyData ||
            `{
    "key": "value"
}`
    );
    const { toast } = useToast();
    const router = useRouter();

    function handleAddBody() {
        console.log({ body: code });
        addEndpointBody({ id: endpointId }, { body: code })
            .then((response) => {
                console.log(response);
                router.refresh();
                toast({ description: response.message });
            })
            .catch((err) => {
                console.log(err);
                toast({ description: err });
            });
    }

    return (
        <div className="mx-2">
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
                    fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
            />
            <Button className="mt-4 w-full" onClick={handleAddBody}>
                <AddIcon />
                Add
            </Button>
        </div>
    );
}
("");
