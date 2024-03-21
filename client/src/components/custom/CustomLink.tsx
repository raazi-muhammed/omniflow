import { Eye } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function CustomLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode | string;
}) {
    return (
        <Link
            className="group -mx-2 flex w-fit gap-2 rounded-sm border border-transparent px-2 align-middle text-foreground hover:border-muted-foreground/10 hover:bg-muted/60"
            href={href}>
            {children}
            <Eye
                size="1.1em "
                className="my-auto hidden text-muted-foreground group-hover:block group-hover:animate-pulse"
            />
        </Link>
    );
}
