import React, { useState } from "react";
import RemoveMember from "./RemoveMember";
import MoveToTeamSelector from "./MoveToTeamSelector";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings2 as EdtiIcon } from "lucide-react";

export default function MemberActionDropDown({
    teamName,
    memberEmail,
}: {
    teamName: string;
    memberEmail: string;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" variant="ghost">
                    <EdtiIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
                <RemoveMember team={teamName} email={memberEmail} />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <MoveToTeamSelector
                            fromTeam={teamName}
                            email={memberEmail}
                        />
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
