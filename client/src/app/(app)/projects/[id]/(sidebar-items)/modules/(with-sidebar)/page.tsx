import ErrorMessage from "@/components/custom/ErrorMessage";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { getModules } from "@/services/module.service";
import { IModule } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import ModuleCard from "../_components/ModuleCard";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";

async function loadModules() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getModules(
        {},
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data;
}

export default function page() {
    return (
        <div className="h-screen-without-navbar mx-8 flex align-middle">
            <ErrorMessage type="info" message="Please select an point" />
        </div>
    );
}
