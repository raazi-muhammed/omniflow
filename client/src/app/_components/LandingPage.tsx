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
        thumbnail: "/landing-page/images/api-doc.jpg",
    },
    {
        title: "DB Design",
        link: "https://cursor.so",
        thumbnail: "/landing-page/images/db-design.jpg",
    },

    {
        title: "DB Design",
        link: "https://editorially.org",
        thumbnail: "/landing-page/images/db-design.jpg",
    },
    {
        title: "DB Design",
        link: "https://editrix.ai",
        thumbnail: "/landing-page/images/db-table.jpg",
    },
    {
        title: "Project",
        link: "https://userogue.com",
        thumbnail: "/landing-page/images/projects.jpg",
    },
    {
        title: "Meetings",
        link: "https://app.pixelperfect.quest",
        thumbnail: "/landing-page/images/meetings.jpg",
    },
    {
        title: "Meetings",
        link: "https://algochurn.com",
        thumbnail: "/landing-page/images/response.jpg",
    },
    {
        title: "Modules",
        link: "https://ui.aceternity.com",
        thumbnail: "/landing-page/images/modules.jpg",
    },
    {
        title: "Project",
        link: "https://tailwindmasterkit.com",
        thumbnail: "/landing-page/images/project-view.jpg",
    },
    {
        title: "Project",
        link: "https://smartbridgetech.com",
        thumbnail: "/landing-page/images/projects.jpg",
    },
    {
        title: "Response",
        link: "https://renderwork.studio",
        thumbnail: "/landing-page/images/response.jpg",
    },

    {
        title: "Tasks",
        link: "https://cremedigital.com",
        thumbnail: "/landing-page/images/tasks.jpg",
    },
    {
        title: "Tasks",
        link: "https://goldenbellsacademy.com",
        thumbnail: "/landing-page/images/tasks.jpg",
    },
    {
        title: "Teams",
        link: "https://invoker.lol",
        thumbnail: "/landing-page/images/teams.jpg",
    },
    {
        title: "Meetings",
        link: "https://efreeinvoice.com",
        thumbnail: "/landing-page/images/meeting-join.jpg",
    },
];
