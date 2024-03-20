import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getMeeting } from "@/services/meeting.service";
import { IMeeting } from "@/types/database";
import moment from "moment";
import { cookies } from "next/headers";
import React from "react";

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
        <div>
            <p>{meeting.name}</p>
            <p>{meeting.agenda}</p>
            <p>{moment(meeting?.startDate).format("ll")}</p>
            <p>{moment(meeting?.endDate).format("ll")}</p>
        </div>
    );
}
