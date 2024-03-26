import VideCall from "./_components/VideCall";
import { IUser } from "@/types/database";
import { cookies } from "next/headers";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { MeetingService } from "@/services/api/meeting.service";

type ResponseType = {
    user: IUser;
};

async function loadJoinMeeting(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new MeetingService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });

    const response = await service.joinMeeting(id).exec();
    return response.data as ResponseType;
}

export default async function MeetingPage({
    params,
}: {
    params: { meetingId: string };
}) {
    const data = await loadJoinMeeting(params.meetingId);

    return (
        <section>
            <VideCall meetId={params.meetingId} user={data.user} />
        </section>
    );
}
