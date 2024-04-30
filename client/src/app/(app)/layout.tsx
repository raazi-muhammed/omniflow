"use client";

import Navbar from "@/components/layout/Navbar";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    const router = useRouter();
    const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);

    if (!isLoading && !isAuth) {
        router.push("/login");
        toast({ variant: "destructive", description: "You are not logged in" });
    }
    return (
        <main className="min-h-screen bg-gradient-to-tr from-[#100730] from-0% via-black via-30% to-[#100730] to-100%">
            <Navbar />
            {children}
        </main>
    );
}
