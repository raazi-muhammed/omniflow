import React, { ReactNode } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";

export default function ErrorMessage({
    type = "error",
    message,
}: {
    message: string;
    type?: "info" | "error";
}) {
    return (
        <div className="flex w-fit gap-2 align-middle text-secondary">
            <i data-lucide="circle-alert"></i>
            {type == "info" ? (
                <AlertCircle size="1.5em" className="my-auto text-yellow-800" />
            ) : (
                <AlertTriangle size="1.5em" className="my-auto text-red-800" />
            )}
            <p className="my-auto">{message}</p>
        </div>
    );
}
