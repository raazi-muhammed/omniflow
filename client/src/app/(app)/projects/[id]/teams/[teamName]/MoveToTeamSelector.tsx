"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { getTeams, moveMember } from "@/services/team.service";
import { ITeam } from "@/types/database";
import { useEffect, useState } from "react";

export default function MoveToTeamSelector({
    email,
    fromTeam,
}: {
    email: string;
    fromTeam: string;
}) {
    const { toast } = useToast();
    const [teams, setTeams] = useState<ITeam[]>([]);

    useEffect(() => {
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
            })
            .catch((error) => {
                toast({
                    description: error || "Error",
                });
            });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {teams.map((team) => (
                    <DropdownMenuItem
                        disabled={fromTeam === team.name}
                        onClick={() => handleMoveTeam(team.name)}>
                        {team.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
