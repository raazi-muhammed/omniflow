import { ReactNode } from "react";

export default function layout({
    children,
    content,
}: {
    children: ReactNode;
    content: ReactNode;
}) {
    return (
        <div className="w-full">
            {content}
            {children}
        </div>
    );
}
