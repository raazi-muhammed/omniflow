import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddIcon } from "@/lib/icons";
import { getTeams } from "@/services/team.service";
import { ITeam } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import ResponsiveGridContainer from "@/components/layout/ResponsiveGridContainer";

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
                <ActionItemsContainer>
                    <Link href="/projects/id/teams/invite-member">
                        <Button size="sm" variant="secondary">
                            <AddIcon />
                            Invite an member
                        </Button>
                    </Link>
                    <Link href="/projects/id/teams/add-team">
                        <Button size="sm">
                            <AddIcon />
                            Add a team
                        </Button>
                    </Link>
                </ActionItemsContainer>
                {teams.map((team) => (
                    <>
                        <section className="flex justify-between">
                            <Heading className="text-xl">{team.name}</Heading>
                            <Button size="sm" variant="secondary">
                                Add a member
                            </Button>
                        </section>
                        <small className="text-secondary">Members</small>
                        <ResponsiveGridContainer>
                            {team.members.length <= 0 && <p>No members</p>}
                            {team.members.map((member) => (
                                <Card className="flex gap-4 p-4 align-middle">
                                    <div className="my-auto">
                                        <Avatar
                                            name={member.info.name}
                                            src={member.info.avatar || ""}
                                        />
                                    </div>
                                    <div>
                                        <small className="text-secondary">
                                            {member.info.email}
                                        </small>
                                        <p>{member.info.name}</p>
                                        <Badge variant="secondary">
                                            {member.role}
                                        </Badge>
                                        <Badge variant="secondary">
                                            {member.inviteStatus}
                                        </Badge>
                                    </div>
                                </Card>
                            ))}
                        </ResponsiveGridContainer>
                        <Separator className="my-4" />
                    </>
                ))}
            </Container>
        </div>
    );
}
