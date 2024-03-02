"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import AppLogo from "../custom/AppLogo";

export default function Sidebar() {
    const pathname = usePathname();

    const options = [
        {
            title: "Projects",
            url: "/projects",
            identifier: "--",
        },
        {
            title: "Overview",
            url: "/projects",
            identifier: "projects",
        },
        {
            title: "Teams",
            url: "#",
            identifier: "teams",
        },
    ];

    return (
        <aside className="min-h-screen min-w-64 border border-t-0 bg-gradient-to-br from-card-from to-card-to p-2 py-8">
            <div className="m-1 my-4 flex gap-2 align-middle text-primary">
                <AppLogo />
                <p className="text-xl font-semibold">Ominflow</p>
            </div>
            <div className="grid gap-2">
                {options.map((opt) => (
                    <>
                        {pathname.includes(opt.identifier) ? (
                            <Link href={opt.url}>
                                <Button className="flex w-full justify-start shadow-sm">
                                    <span className="text-start">
                                        {opt.title}
                                    </span>
                                </Button>
                            </Link>
                        ) : (
                            <Link href={opt.url}>
                                <Button
                                    variant="secondary"
                                    className="flex w-full justify-start shadow-sm">
                                    <span className="text-start">
                                        {opt.title}
                                    </span>
                                </Button>
                            </Link>
                        )}
                    </>
                ))}
            </div>
        </aside>
    );
}
