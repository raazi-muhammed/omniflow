import AnimateButton from "@/components/animated/AnimateButton";
import AnimateCard from "@/components/animated/AnimateCard";
import CustomLink from "@/components/custom/CustomLink";
import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon } from "@/lib/icons";
import { MeetingService } from "@/services/api/meeting.service";
import { IMeeting } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";
import MeetingCard from "../_components/MeetingCard";

async function loadMeetings() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;
    const service = new MeetingService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    const response = await service.getMeetings().exec();
    return response.data as IMeeting[];
}

export default async function page({
    children,
    params,
}: {
    children: ReactNode;
    params: { projectId: string };
}) {
    const meetings: IMeeting[] = await loadMeetings();

    const TODAY = new Date();
    const upcomingMeetings = meetings.filter(
        (m) => new Date(m.startDate) > TODAY
    );
    const previousMeetings = meetings.filter(
        (m) => new Date(m.startDate) <= TODAY
    );

    return (
        <Container>
            <SectionSplitter>
                <SectionAside className="mt-8">
                    <section className="space-y-4">
                        <AnimateButton>
                            <Link
                                href={`/projects/${params.projectId}/meetings/add`}
                                legacyBehavior>
                                <Button
                                    size="sm"
                                    className="me-0 ms-auto flex w-fit">
                                    <AddIcon /> Add meeting
                                </Button>
                            </Link>
                        </AnimateButton>
                        <Heading variant="sm">Upcoming Meetings</Heading>
                        {upcomingMeetings.map((meeting) => (
                            <MeetingCard
                                projectId={params.projectId}
                                meeting={meeting}
                            />
                        ))}
                        {upcomingMeetings.length < 1 && (
                            <ErrorMessage
                                type="info"
                                className="-ms-2"
                                message="No upcoming meetings"
                            />
                        )}
                        {previousMeetings.length > 0 && (
                            <>
                                <Heading variant="sm">
                                    Previous Meetings
                                </Heading>
                                {previousMeetings.map((meeting) => (
                                    <MeetingCard
                                        projectId={params.projectId}
                                        meeting={meeting}
                                    />
                                ))}
                            </>
                        )}
                    </section>
                </SectionAside>
                <SectionContent>{children}</SectionContent>
            </SectionSplitter>
        </Container>
    );
}
