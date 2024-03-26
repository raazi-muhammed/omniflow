"use client";

import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import { ApiDocService } from "@/services/api/api-doc.service";
import { makeApiCall } from "@/lib/apicaller";

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
        logger.debug({ body: code });

        const service = new ApiDocService();

        makeApiCall(
            () => service.addEndpointBody(endpointId, { body: code }).exec(),
            { toast, afterSuccess: () => router.refresh() }
        );
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
