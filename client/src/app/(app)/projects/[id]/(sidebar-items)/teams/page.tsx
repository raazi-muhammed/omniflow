import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddIcon, EditIcon } from "@/lib/icons";
import { getTeams } from "@/services/team.service";
import { ITeam, InviteStatus, Role } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import ResponsiveGridContainer from "@/components/layout/ResponsiveGridContainer";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { Label } from "@/components/ui/label";

async function loadTeams() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getTeams({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    console.log(response.data);

    return response.data;
}

export default async function page() {
    const teams: ITeam[] = await loadTeams();
    return (
        <div className="w-full">
            <Container>
                <ActionItemsContainer>
                    <Link href="teams/invite-member">
                        <Button size="sm" variant="muted">
                            <AddIcon />
                            Invite an member
                        </Button>
                    </Link>
                    <Link href="teams/add-team">
                        <Button size="sm">
                            <AddIcon />
                            Add a team
                        </Button>
                    </Link>
                </ActionItemsContainer>
                {teams.length <= 0 && (
                    <ErrorMessage message="Not teams yet" type="info" />
                )}
                {teams.map((team) => (
                    <>
                        <section className="flex justify-between">
                            <Heading variant="sm">{team.name}</Heading>
                            <Link href={`teams/${team.name}`}>
                                <Button size="sm" variant="muted">
                                    <EditIcon /> Edit team
                                </Button>
                            </Link>
                        </section>
                        <ResponsiveGridContainer>
                            {team.members.length <= 0 && (
                                <ErrorMessage
                                    message="No Members on this team"
                                    type="info"
                                />
                            )}
                            {team.members.map((member) => (
                                <Card className="flex gap-4 p-4 align-middle">
                                    <div className="my-auto">
                                        <Avatar
                                            name={member.info.name}
                                            src={member.info.avatar || ""}
                                        />
                                    </div>
                                    <div className="my-auto">
                                        <Label>{member.info.email}</Label>
                                        <p>{member.info.name}</p>
                                        {member.role !== Role.DEFAULT ? (
                                            <Badge
                                                variant="secondary"
                                                className="capitalize">
                                                {member.role.toLowerCase()}
                                            </Badge>
                                        ) : null}

                                        {member.inviteStatus !==
                                        InviteStatus.ACCEPTED ? (
                                            <Badge
                                                variant="secondary"
                                                className="capitalize">
                                                {member.inviteStatus.toLowerCase()}
                                            </Badge>
                                        ) : null}
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
