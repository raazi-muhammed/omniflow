import Sidebar from "@/components/layout/Sidebar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function layout({ children }: Props) {
    return (
        <section className="flex">
            <Sidebar />
            {children}
        </section>
    );
}
