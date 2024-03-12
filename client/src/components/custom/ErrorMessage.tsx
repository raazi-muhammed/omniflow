import React, { ReactNode } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ErrorMessage({
    type = "error",
    message,
    className,
}: {
    message: string | undefined;
    type?: "info" | "error";
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex w-fit gap-2 align-middle text-secondary",
                className
            )}>
            <i data-lucide="circle-alert"></i>
            {type == "info" ? (
                <AlertCircle size="1.5em" className="my-auto text-yellow-800" />
            ) : (
                <AlertTriangle size="1.5em" className="my-auto text-red-800" />
            )}
            <p className="my-auto">{message || "Something went wrong"}</p>
        </div>
    );
}
