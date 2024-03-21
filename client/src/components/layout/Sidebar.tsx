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
import {
    FileCode2,
    GanttChartSquare,
    KanbanSquare,
    ListTodo,
    Puzzle,
    Users,
    Video,
} from "lucide-react";
import { Separator } from "../ui/separator";

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
    }, [dispatch]);

    const options = [
        {
            title: "Projects",
            url: "/projects",
            identifier: "",
            icon: <GanttChartSquare className="me-2" size="1.3em" />,
        },
        {
            title: "Overview",
            url: `/projects/${projectInfo?.id}`,
            identifier: "overview",
            icon: <KanbanSquare className="me-2" size="1.3em" />,
        },
        {
            type: "separator",
            url: "#",
        },
        {
            title: "Teams",
            url: `/projects/${projectInfo?.id}/teams`,
            identifier: "teams",
            icon: <Users className="me-2" size="1.3em" />,
        },
        {
            title: "API Docs",
            url: `/projects/${projectInfo?.id}/api-docs`,
            identifier: "api-docs",
            icon: <FileCode2 className="me-2" size="1.3em" />,
        },
        {
            title: "Modules",
            url: `/projects/${projectInfo?.id}/modules`,
            identifier: "modules",
            icon: <Puzzle className="me-2" size="1.3em" />,
        },
        {
            title: "Tasks",
            url: `/projects/${projectInfo?.id}/tasks`,
            identifier: "tasks",
            icon: <ListTodo className="me-2" size="1.3em" />,
        },
        {
            type: "separator",
            url: "#",
        },
        {
            title: "Meetings",
            url: `/projects/${projectInfo?.id}/meetings`,
            identifier: "meetings",
            icon: <Video className="me-2" size="1.3em" />,
        },
    ];

    const urls = pathname.split("/").slice(3);
    urls.push("overview");

    return (
        <aside className="sticky top-0 z-50 -mt-20 h-screen min-w-64 border border-t-0 bg-black/50 p-2 py-8 backdrop-blur-lg">
            <div className="mx-4 my-4 flex gap-2 align-middle text-primary">
                <AppLogo />
                <p className="text-xl font-semibold">Ominflow</p>
            </div>
            <div className="grid gap-2">
                {options.map((opt) => (
                    <>
                        {opt.type !== "separator" ? (
                            <>
                                {urls[0] === opt.identifier ? (
                                    <Link href={opt.url} legacyBehavior>
                                        <Button className="flex w-full justify-start shadow-sm">
                                            {opt.icon}
                                            <span className="text-start">
                                                {opt.title}
                                            </span>
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={opt.url} legacyBehavior>
                                        <Button
                                            variant="ghost"
                                            className="flex w-full justify-start shadow-sm">
                                            {opt.icon}
                                            <span className="text-start">
                                                {opt.title}
                                            </span>
                                        </Button>
                                    </Link>
                                )}
                            </>
                        ) : (
                            <div className="px-2">
                                <Separator />
                            </div>
                        )}
                    </>
                ))}
            </div>
        </aside>
    );
}
