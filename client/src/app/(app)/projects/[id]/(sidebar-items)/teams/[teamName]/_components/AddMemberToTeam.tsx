"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ChangeTeamLeadForm from "../_forms/ChangeTeamLeadForm";
import { IMemberStatus } from "@/types/database";
import { useEffect, useState } from "react";
import { TeamService } from "@/services/api/team.service";
import { IResponse } from "@/services/api/utils";
import AddMemberToTeamForm from "../_forms/AddMemberToTeamForm";
import { AddIcon } from "@/lib/icons";

export default function AddMemberToTeam({ teamName }: { teamName: string }) {
    const [membersList, setMemberList] = useState<IMemberStatus[]>([]);

    useEffect(() => {
        const service = new TeamService();
        service
            .getMembersList()
            .exec()
            .then((res: IResponse) => {
                console.log("Res", res);
                setMemberList(res.data);
            });
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="muted" className="ms-auto">
                    <AddIcon />
                    Add Member
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <AddMemberToTeamForm
                    membersList={membersList}
                    teamName={teamName}
                />
            </PopoverContent>
        </Popover>
    );
}
