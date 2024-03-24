"use client";

import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { IUser } from "@/types/database";

export default function VideCall({
    meetId,
    user,
}: {
    meetId: string;
    user: IUser;
}) {
    if (isNaN(Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID))) {
        console.log("ZEGO API ID NOT FOUND");
    }
    if (!process.env.NEXT_PUBLIC_ZEGO_ZEGO_SERVER_SECRET) {
        console.log("ZEGO SEVER SECRET NOT FOUND");
    }

    let myMeeting = async (element: HTMLElement) => {
        // generate Kit Token
        const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret = String(
            process.env.NEXT_PUBLIC_ZEGO_ZEGO_SERVER_SECRET
        );
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            meetId,
            user.id || "id",
            user.name || "name"
        );

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };
    return (
        <div>
            <div
                className="w-screen-without-sidebar h-screen-without-navbar border border-red-500"
                //@ts-ignore
                ref={myMeeting}
            />
        </div>
    );
}
