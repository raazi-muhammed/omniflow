import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import { getTeams } from "@/services/team.service";
import { ITeam } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";

async function loadTeams() {
    const response = await getTeams({
        headers: { Cookie: cookies().toString() },
    });
    return response.data;
}

export default async function page() {
    const teams: ITeam[] = await loadTeams();
    return (
        <div className="w-full">
            <Container>
                <section className="my-8 ms-auto flex w-fit justify-end gap-4">
                    <Link href="/projects/id/teams/invite-member">
                        <Button size="sm" variant="secondary">
                            <AddIcon />
                            Invite an member
                        </Button>
                    </Link>
                    <Link href="/projects/add-project">
                        <Button size="sm">
                            <AddIcon />
                            Add a team
                        </Button>
                    </Link>
                </section>
                <Heading>Teams</Heading>
                {teams.map((team) => (
                    <>
                        <p>{team.name}</p>
                        {team.members.map((member) => (
                            <>
                                <p>{member.info.name}</p>
                                <p>{member.info.email}</p>
                            </>
                        ))}
                    </>
                ))}
            </Container>
        </div>
    );
}
