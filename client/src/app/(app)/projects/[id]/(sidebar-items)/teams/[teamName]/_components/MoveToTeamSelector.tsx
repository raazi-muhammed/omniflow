"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { getTeams, moveMember } from "@/services/team.service";
import { ITeam } from "@/types/database";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
        getTeams().then((response) => {
            setTeams(response.data);
        });
    }, []);

    function handleMoveTeam(toTeam: string) {
        console.log();
        moveMember({ fromTeam, toTeam, email })
            .then((response) => {
                toast({
                    description: response?.message || "Success",
                });
                router.refresh();
            })
            .catch((error) => {
                toast({
                    description: error || "Error",
                });
            });
    }
    return (
        <DropdownMenuSubContent>
            {teams.map((team) => (
                <DropdownMenuItem
                    disabled={fromTeam === team.name}
                    onClick={() => handleMoveTeam(team.name)}>
                    {team.name}
                </DropdownMenuItem>
            ))}
        </DropdownMenuSubContent>
    );
}
