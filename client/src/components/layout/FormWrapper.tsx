import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FormWrapper({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("mx-auto w-full max-w-2xl", className)}>
            {children}
        </div>
    );
}
