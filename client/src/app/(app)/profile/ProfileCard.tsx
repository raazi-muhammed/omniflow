import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

type Prop = {
    children: ReactNode;
    title: string;
};
export default function ProfileCard({ children, title }: Prop) {
    return (
        <section className="p-4 pt-2">
            <small className="text-secondary">{title}</small>
            {children}
        </section>
    );
}
