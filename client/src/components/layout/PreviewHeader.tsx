import { cn } from "@/lib/utils";
import React from "react";

export function PreviewHeader({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("-mt-2 grid w-full grid-cols-3 gap-6", className)}>
            {children}
        </div>
    );
}

export function PreviewActions({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-8 flex justify-end w-full", className)}>
            {children}
        </div>
    );
}

export function PreviewContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("col-span-2 -mt-2", className)}>{children}</div>;
}
export function PreviewAside({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("space-y-4", className)}>{children}</div>;
}
