import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
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
import React from "react";

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

export default async function page() {
    const meetings: IMeeting[] = await loadMeetings();
    return (
        <Container>
            <section className="flex justify-between">
                <Heading>Meetings</Heading>
                <Link href="meetings/add" legacyBehavior>
                    <Button size="sm">
                        <AddIcon /> Add meeting
                    </Button>
                </Link>
            </section>
            <section className="space-y-4">
                {meetings.map((meeting) => (
                    <Card className="p-4">
                        <p>{meeting.name}</p>
                        <Label>{meeting.agenda}</Label>
                        <br />
                        <Label>{moment(meeting.startDate).format("ll")}</Label>
                    </Card>
                ))}
            </section>
        </Container>
    );
}
