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
import { getMeetings } from "@/services/meeting.service";
import { IMeeting } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";

async function loadMeetings() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getMeetings({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
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
                        <Link
                            href={`/projects/${params.projectId}/meetings/add`}
                            legacyBehavior>
                            <Button size="sm" className="me-0 ms-auto flex">
                                <AddIcon /> Add meeting
                            </Button>
                        </Link>
                        <Heading variant="sm">Upcoming Meetings</Heading>
                        {upcomingMeetings.map((meeting) => (
                            <Card className="p-4">
                                <Link href={`${meeting.id}`}>
                                    <p className="hover:underline">
                                        {meeting.name}
                                    </p>
                                </Link>
                                <Label>
                                    {moment(meeting.startDate)
                                        .startOf("day")
                                        .fromNow()}
                                </Label>
                            </Card>
                        ))}
                        <Heading variant="sm">Previous Meetings</Heading>
                        {previousMeetings.map((meeting) => (
                            <Card className="p-4">
                                <Link
                                    href={`/projects/${params.projectId}/meetings/${meeting.id}`}>
                                    <p className="hover:underline">
                                        {meeting.name}
                                    </p>
                                </Link>
                                <Label>
                                    {moment(meeting.startDate)
                                        .startOf("day")
                                        .fromNow()}
                                </Label>
                            </Card>
                        ))}
                    </section>
                </SectionAside>
                <SectionContent>{children}</SectionContent>
            </SectionSplitter>
        </Container>
    );
}