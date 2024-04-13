"use client";

import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import AppLogo from "../custom/AppLogo";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { ProjectService } from "@/services/api/project.service";
import { useDispatch } from "react-redux";
import { setProject } from "@/redux/features/projectSlice";
import { IAccess, IProject } from "@/types/database";
import {
    FileCode2 as APIDocsIcon,
    GanttChartSquare as ProjectIcon,
    KanbanSquare as OverviewIcon,
    ListTodo as TasksIcon,
    PanelRightClose as MenuBarIcon,
    Puzzle as ModulesIcon,
    Users as TeamsIcon,
    Video as MeetingsIcon,
    Database as DatabaseIcon,
    MessagesSquare as ChatIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Option = {
    type?: string;
    url: string;
    title?: string;
    identifier?: string;
    icon?: JSX.Element;
};
import { cn } from "@/lib/utils";
import AnimateButton from "../animated/AnimateButton";

export default function Sidebar() {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const projectInfo = useAppSelector(
        (state) => state.projectReducer.projectData
    );

    useEffect(() => {
        const service = new ProjectService();
        service
            .getCurrentProject()
            .exec()
            .then((response) => {
                dispatch(
                    setProject(response.data as IProject & { access: IAccess })
                );
            });
    }, [dispatch]);

    const options: Option[] = [
        {
            title: "Projects",
            url: "/projects",
            identifier: "",
            icon: <ProjectIcon className="me-2" size="1.3em" />,
        },
        {
            title: "Overview",
            url: `/projects/${projectInfo?.id}`,
            identifier: "overview",
            icon: <OverviewIcon className="me-2" size="1.3em" />,
        },
        {
            type: "separator",
            url: "#",
        },
        {
            title: "Teams",
            url: `/projects/${projectInfo?.id}/teams`,
            identifier: "teams",
            icon: <TeamsIcon className="me-2" size="1.3em" />,
        },
        {
            title: "Members",
            url: `/projects/${projectInfo?.id}/members`,
            identifier: "members",
            icon: <TeamsIcon className="me-2" size="1.3em" />,
        },
        {
            title: "API Docs",
            url: `/projects/${projectInfo?.id}/api-docs`,
            identifier: "api-docs",
            icon: <APIDocsIcon className="me-2" size="1.3em" />,
        },
        {
            title: "DB Design",
            url: `/projects/${projectInfo?.id}/db-design`,
            identifier: "db-design",
            icon: <DatabaseIcon className="me-2" size="1.3em" />,
        },
        {
            title: "Modules",
            url: `/projects/${projectInfo?.id}/modules`,
            identifier: "modules",
            icon: <ModulesIcon className="me-2" size="1.3em" />,
        },
        {
            title: "Tasks",
            url: `/projects/${projectInfo?.id}/tasks`,
            identifier: "tasks",
            icon: <TasksIcon className="me-2" size="1.3em" />,
        },
        {
            type: "separator",
            url: "#",
        },
        {
            title: "Meetings",
            url: `/projects/${projectInfo?.id}/meetings`,
            identifier: "meetings",
            icon: <MeetingsIcon className="me-2" size="1.3em" />,
        },
        {
            title: "Chats",
            url: `/projects/${projectInfo?.id}/chats`,
            identifier: "chats",
            icon: <ChatIcon className="me-2" size="1.3em" />,
        },
    ];

    const urls = pathname.split("/").slice(3);
    urls.push("overview");

    return (
        <>
            <Sheet>
                <SheetTrigger className="absolute left-5 top-[1.75rem] z-[9999] text-muted-foreground sm:hidden">
                    <MenuBarIcon />
                </SheetTrigger>
                <SheetContent side="left" className="z-[9999] max-w-72 p-0">
                    <SidebarItems
                        className="border-none"
                        urls={urls}
                        options={options}
                    />
                </SheetContent>
            </Sheet>
            <SidebarItems
                className="sticky top-0 z-50 -mt-20 hidden h-screen min-w-72 sm:block"
                urls={urls}
                options={options}
            />
        </>
    );
}

function SidebarItems({
    options,
    urls,
    className,
}: {
    options: Option[];
    urls: string[];
    className?: string;
}) {
    return (
        <aside
            className={cn(
                "border border-t-0 bg-black/50 p-2 py-8 backdrop-blur-lg",
                className
            )}>
            <div className="mx-4 my-4 flex gap-2 align-middle text-primary">
                <AppLogo />
                <p className="text-xl font-semibold">Ominflow</p>
            </div>
            <div className="grid gap-2">
                {options.map((opt, index) => (
                    <AnimateButton key={opt.identifier || index}>
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
                    </AnimateButton>
                ))}
            </div>
        </aside>
    );
}
