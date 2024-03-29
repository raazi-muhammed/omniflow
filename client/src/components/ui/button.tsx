import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:opacity-90",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-br from-primary-from to-primary-to border border-primary-border text-primary-foreground",
                destructive:
                    "bg-gradient-to-br from-destructive-from to-destructive-to border border-destructive-border text-white hover:bg-destructive/90",
                destructiveFlat:
                    "text-destructive bg-destructive-foreground hover:bg-destructive border border-destructive-border/20 hover:text-destructive-foreground",
                outline:
                    "border hover:border-muted-foreground/10 bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary border text-secondary-foreground hover:bg-secondary/80",
                muted: "bg-muted border border-muted-foreground/10 text-muted-foreground hover:bg-muted/80",
                ghost: "hover:bg-accent  hover:text-accent-foreground border border-card/0 hover:border-muted-foreground/10",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-full px-4",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                actionIcon: "h-7 w-7 p-0 m-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
