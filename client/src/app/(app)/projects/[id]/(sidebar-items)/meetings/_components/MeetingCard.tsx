import AnimateCard from "@/components/animated/AnimateCard";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IMeeting } from "@/types/database";
import moment from "moment";
import Link from "next/link";
import React from "react";

export default function MeetingCard({
    replace = false,
    meeting,
    projectId,
}: {
    replace?: boolean;
    projectId: string;
    meeting: IMeeting;
}) {
    return (
        <AnimateCard type="subtle">
            <Link href={`/projects/${projectId}/meetings/${meeting.id}`}>
                <Card key={meeting.id} className="p-4">
                    <p>{meeting.name}</p>
                    <Label>
                        {moment(meeting.startDate).startOf("day").fromNow()}
                    </Label>
                </Card>
            </Link>
        </AnimateCard>
    );
}
