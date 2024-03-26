"use client";

import {
    DropdownMenuItem,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import { TeamService } from "@/services/api/team.service";
import { ITeam } from "@/types/database";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function MoveToTeamSelector({
    email,
    fromTeam,
}: {
    email: string;
    fromTeam: string;
}) {
    const { toast } = useToast();
    const [teams, setTeams] = useState<ITeam[]>([]);
    const router = useRouter();

    useMemo(() => {
        const service = new TeamService();
        service
            .getTeams()
            .exec()
            .then((response) => {
                setTeams(response.data);
            });
    }, []);

    function handleMoveTeam(toTeam: string) {
        const service = new TeamService();
        makeApiCall(
            () => service.moveMember({ fromTeam, toTeam, email }).exec(),
            {
                toast,
                afterSuccess: () => router.refresh(),
            }
        );
    }
    return (
        <DropdownMenuSubContent>
            {teams.map((team, index) => (
                <DropdownMenuItem
                    key={index}
                    disabled={fromTeam === team.name}
                    onClick={() => handleMoveTeam(team.name)}>
                    {team.name}
                </DropdownMenuItem>
            ))}
        </DropdownMenuSubContent>
    );
}
