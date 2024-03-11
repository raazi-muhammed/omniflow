import { cn } from "@/lib/utils";
import React from "react";

export function SectionSplitter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "container flex flex-col gap-8 xl:flex-row",
                className
            )}>
            {children}
        </div>
    );
}

export function SectionContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mx-auto w-full max-w-4xl", className)}>
            {children}
        </div>
    );
}

export function SectionAside({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "mx-auto mt-16 w-full max-w-4xl xl:max-w-sm",
                className
            )}>
            {children}
        </div>
    );
}
