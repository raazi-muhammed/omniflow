import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function layout({ children }: Props) {
    return (
        <main className="min-h-screen bg-gradient-to-tr from-[#100730] from-0% via-black via-30% to-[#100730] to-100%">
            <Navbar />
            {children}
        </main>
    );
}
