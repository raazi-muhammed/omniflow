import ErrorMessage from "@/components/custom/ErrorMessage";
import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { AddIcon, EditIcon } from "@/lib/icons";
import { getMeeting } from "@/services/meeting.service";
import { IMeeting } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import React from "react";
import { AddNote } from "./_components/AddNote";
import { EditNote } from "./_components/EditNote";
import { EditMeeting } from "./_components/EditMeetings";
import {
    PreviewActions,
    PreviewAside,
    PreviewContent,
    PreviewHeader,
} from "@/components/layout/PreviewHeader";

async function loadMeeting(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getMeeting(
        { id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data as IMeeting;
}

export default async function MeetingPage({
    params,
}: {
    params: { meetingId: string };
}) {
    const meeting: IMeeting = await loadMeeting(params.meetingId);

    return (
        <main className="space-y-6">
            <PreviewActions>
                <EditMeeting meeting={meeting} />
            </PreviewActions>
            <PreviewHeader>
                <PreviewContent>
                    <Heading>{meeting.name}</Heading>
                    <Label>Agenda</Label>
                    <p>{meeting.agenda}</p>
                </PreviewContent>
                <PreviewAside>
                    <div>
                        <Label>Start Date</Label>
                        <p>{moment(meeting?.startDate).format("ll")}</p>
                    </div>
                    <div>
                        <Label>End Date</Label>
                        <p>{moment(meeting?.endDate).format("ll")}</p>
                    </div>
                </PreviewAside>
            </PreviewHeader>
            <Separator />
            <section>
                {meeting.notes ? (
                    <>
                        <section className="flex justify-between">
                            <Heading variant="sm">Notes</Heading>
                            <EditNote
                                notes={meeting.notes}
                                meetingId={meeting.id || ""}
                            />
                        </section>
                        <Card className="mt-2 p-4">
                            <p>{meeting.notes}</p>
                        </Card>
                    </>
                ) : (
                    <>
                        <Heading variant="sm">Notes</Heading>

                        <Card className="mt-2 p-4">
                            <section className="mx-auto w-fit px-12 py-8">
                                <AddNote moduleId={meeting.id || ""} />
                            </section>
                        </Card>
                    </>
                )}
            </section>
        </main>
    );
}
