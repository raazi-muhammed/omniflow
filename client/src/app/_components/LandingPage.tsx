"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function LandingPage() {
    return <HeroParallax products={products} />;
}
export const products = [
    {
        title: "API Docs",
        link: "https://gomoonbeam.com",
        thumbnail: "/landing-page/images/api-doc.png",
    },
    {
        title: "DB Design",
        link: "https://cursor.so",
        thumbnail: "/landing-page/images/db-design.png",
    },
    {
        title: "Project",
        link: "https://userogue.com",
        thumbnail: "/landing-page/images/projects.png",
    },

    {
        title: "DB Design",
        link: "https://editorially.org",
        thumbnail: "/landing-page/images/db-design.png",
    },
    {
        title: "DB Design",
        link: "https://editrix.ai",
        thumbnail: "/landing-page/images/db-table.png",
    },
    {
        title: "Meetings",
        link: "https://app.pixelperfect.quest",
        thumbnail: "/landing-page/images/meetings.png",
    },

    {
        title: "Meetings",
        link: "https://algochurn.com",
        thumbnail: "/landing-page/images/response.png",
    },
    {
        title: "Modules",
        link: "https://ui.aceternity.com",
        thumbnail: "/landing-page/images/module.png",
    },
    {
        title: "Project",
        link: "https://tailwindmasterkit.com",
        thumbnail: "/landing-page/images/overview.png",
    },
    {
        title: "Project",
        link: "https://smartbridgetech.com",
        thumbnail: "/landing-page/images/projects.png",
    },
    {
        title: "Response",
        link: "https://renderwork.studio",
        thumbnail: "/landing-page/images/response.png",
    },

    {
        title: "Tasks",
        link: "https://cremedigital.com",
        thumbnail: "/landing-page/images/task-view.png",
    },
    {
        title: "Tasks",
        link: "https://goldenbellsacademy.com",
        thumbnail: "/landing-page/images/task.png",
    },
    {
        title: "Teams",
        link: "https://invoker.lol",
        thumbnail: "/landing-page/images/team.png",
    },
    {
        title: "Meetings",
        link: "https://efreeinvoice.com",
        thumbnail: "/landing-page/images/meeting-join.png",
    },
];
