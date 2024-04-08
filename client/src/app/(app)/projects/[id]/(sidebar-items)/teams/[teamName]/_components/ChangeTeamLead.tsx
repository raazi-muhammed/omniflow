"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ChangeTeamLeadForm from "../_forms/ChangeTeamLeadForm";
import { IMemberStatus } from "@/types/database";
import AnimateButton from "@/components/animated/AnimateButton";

export default function ChangeTeamLead({
    membersList,
    teamName,
}: {
    membersList: IMemberStatus[];
    teamName: string;
}) {
    return (
        <Popover>
            <PopoverTrigger className="ms-auto">
                <AnimateButton>
                    <Button size="sm" variant="muted" className="ms-auto">
                        Change team lead
                    </Button>
                </AnimateButton>
            </PopoverTrigger>
            <PopoverContent>
                <ChangeTeamLeadForm
                    membersList={membersList}
                    teamName={teamName}
                />
            </PopoverContent>
        </Popover>
    );
}
