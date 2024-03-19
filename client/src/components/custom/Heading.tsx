import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    variant?: "default" | "spaced" | "sm" | "form";
};

export default function Heading({
    children,
    className,
    variant = "default",
}: Props) {
    switch (variant) {
        case "default":
            return (
                <h3
                    className={cn(
                        "text-primary text-3xl font-semibold my-2",
                        className
                    )}>
                    {children}
                </h3>
            );
        case "spaced":
            return (
                <h3
                    className={cn(
                        "text-primary text-3xl font-semibold my-2 mt-12",
                        className
                    )}>
                    {children}
                </h3>
            );
        case "sm":
            return (
                <h3
                    className={cn(
                        "text-muted-foreground text-xl font-semibold",
                        className
                    )}>
                    {children}
                </h3>
            );
        case "form":
            return (
                <h3
                    className={cn(
                        "mx-2 border-b pt-4 text-muted-foreground text-xl font-semibold",
                        className
                    )}>
                    {children}
                </h3>
            );

        default:
            return (
                <h3
                    className={cn(
                        "text-gray-700 text-4xl mt-8 mb-4 relative",
                        className
                    )}>
                    {children}
                </h3>
            );
    }
}
