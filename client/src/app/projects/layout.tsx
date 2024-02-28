import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function layout({ children }: Props) {
    return (
        <main className="bg-main-pattern min-h-screen">
            <Navbar />
            {children}
        </main>
    );
}
