"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import { TeamService } from "@/services/api/team.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InvitationComponent() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const message = searchParams.get("message");
    const router = useRouter();
    function handleAcceptInvitation() {
        if (!token) {
            toast({
                description: "No token found",
            });
            return;
        }

        const service = new TeamService();
        makeApiCall(
            () =>
                service
                    .changeInvitationStatus({
                        token,
                        invitationAccepted: true,
                    })
                    .exec(),
            {
                toast,
                afterSuccess: () => {
                    router.push("/projects");
                    router.refresh();
                },
            }
        );
    }
    function handleRejectInvitation() {
        if (!token) {
            toast({
                description: "No token found",
            });
            return;
        }
        const service = new TeamService();
        makeApiCall(
            () =>
                service
                    .changeInvitationStatus({
                        token,
                        invitationAccepted: false,
                    })
                    .exec(),
            {
                toast,
                afterSuccess: () => {
                    router.push("/projects");
                    router.refresh();
                },
            }
        );
    }

    return (
        <main className="grid min-h-[80vh] place-items-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Project invitation</CardTitle>
                    <CardDescription>
                        {message || "Not message"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end gap-4">
                    <Button
                        onClick={handleRejectInvitation}
                        variant="secondary">
                        Reject
                    </Button>
                    <Button onClick={handleAcceptInvitation}>
                        Accept Invitation
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}

export default function InvitationPage() {
    return (
        <Suspense>
            <InvitationComponent />
        </Suspense>
    );
}
