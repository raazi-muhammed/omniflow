"use client";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import AppLogo from "../custom/AppLogo";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { getCurrentProject } from "@/services/project.service";
import { useDispatch } from "react-redux";
import { setProject } from "@/redux/features/projectSlice";
import { IProject } from "@/types/database";
import { GanttChartSquare, KanbanSquare, Users } from "lucide-react";

export default function Sidebar() {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const projectInfo = useAppSelector(
        (state) => state.projectReducer.projectData
    );

    useEffect(() => {
        getCurrentProject().then((response) => {
            dispatch(setProject(response.data as IProject));
        });
    }, []);

    const options = [
        {
            title: "Projects",
            url: "/projects",
            identifier: "",
            icon: <GanttChartSquare className="me-2" size="1.3em" />,
        },
        {
            title: "Overview",
            url: `/projects/${projectInfo?._id}`,
            identifier: "overview",
            icon: <KanbanSquare className="me-2" size="1.3em" />,
        },
        {
            title: "Teams",
            url: `/projects/${projectInfo?._id}/teams`,
            identifier: "teams",
            icon: <Users className="me-2" size="1.3em" />,
        },
        {
            title: "API Docs",
            url: `/projects/${projectInfo?._id}/api-docs`,
            identifier: "api-docs",
            icon: <Users className="me-2" size="1.3em" />,
        },
    ];

    const urls = pathname.split("/").slice(3);
    urls.push("overview");

    return (
        <aside className="ab sticky top-0 -mt-20 h-screen min-w-64 border border-t-0 bg-gradient-to-br from-card-from to-card-to p-2 py-8">
            <div className="m-1 my-4 flex gap-2 align-middle text-primary">
                <AppLogo />
                <p className="text-xl font-semibold">Ominflow</p>
            </div>
            <div className="grid gap-2">
                {options.map((opt, i) => (
                    <>
                        {urls[0] === opt.identifier ? (
                            <Link href={opt.url}>
                                <Button className="flex w-full justify-start shadow-sm">
                                    {opt.icon}
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
                                    {opt.icon}
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
