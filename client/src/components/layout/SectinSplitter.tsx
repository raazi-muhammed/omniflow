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
        <div className={cn("grid lg:grid-cols-3 grid-cols-1 gap-4", className)}>
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
    return <div className={cn("col-span-2 w-full", className)}>{children}</div>;
}

export function SectionAside({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mt-16 w-full max-w-4xl xl:max-w-sm", className)}>
            {children}
        </div>
    );
}
