"use client";

import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function layout({ children }: Props) {
    const router = useRouter();
    const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);

    if (!isLoading && isAuth) {
        router.push("/projects");
        toast({ description: "You are already logged in" });
    }
    return children;
}
