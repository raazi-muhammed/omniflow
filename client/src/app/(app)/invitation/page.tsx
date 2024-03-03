"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { changeInvitationStatus } from "@/services/team.service";
import { useSearchParams } from "next/navigation";

export default function page() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    function handleAcceptInvitation() {
        if (!token) {
            toast({
                description: "No token found",
            });
            return;
        }
        changeInvitationStatus({
            token,
            invitationAccepted: true,
        })
            .then((response) => {
                toast({
                    description: response?.message || "Invitation accepted",
                });
            })
            .catch((error) => {
                toast({
                    title: "Invitation accepted failed",
                    description: error || "failed",
                });
            });
    }
    function handleRejectInvitation() {
        if (!token) {
            toast({
                description: "No token found",
            });
            return;
        }
        changeInvitationStatus({
            token,
            invitationAccepted: false,
        })
            .then((response) => {
                toast({
                    description: response?.message || "Invitation accepted",
                });
            })
            .catch((error) => {
                toast({
                    title: "Invitation accepted failed",
                    description: error || "failed",
                });
            });
    }

    return (
        <div>
            <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
            <Button onClick={handleRejectInvitation} variant="secondary">
                Reject
            </Button>
        </div>
    );
}
