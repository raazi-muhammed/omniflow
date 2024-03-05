import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTeamMembers } from "@/services/team.service";
import { ITeam, ITeamMember } from "@/types/database";
import { DeleteIcon } from "lucide-react";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ChangeTeamLeadForm from "./ChangeTeamLeadForm";
import RemoveMember from "./RemoveMember";
import MoveToTeamSelector from "./MoveToTeamSelector";
import RemoveTeam from "./RemoveTeam";

export async function getTeamsData(teamName: string) {
    const response = await getTeamMembers(
        {
            teamName,
        },
        { headers: { Cookie: cookies().toString() } }
    );
    return response.data as ITeam;
}

export default async function page({
    params,
}: {
    params: { teamName: string };
}) {
    const team = await getTeamsData(params.teamName);
    return (
        <main className="w-full">
            <Container className="flex flex-col gap-8 xl:flex-row">
                <section className="w-full max-w-3xl">
                    <Heading variant="spaced">{team.name}</Heading>
                    <section className="grid grid-cols-2 gap-4">
                        {team.members.map((member) => (
                            <Card>
                                <CardHeader className="flex flex-row">
                                    <div className="my-auto me-2">
                                        <Avatar
                                            name={member.info.name}
                                            src={member.info.avatar || ""}
                                        />
                                    </div>
                                    <section>
                                        <p>{member.info.name}</p>
                                        <small className="text-secondary">
                                            {member.info.email}
                                        </small>
                                        <div className="mt-2 flex gap-2">
                                            <Badge variant="secondary">
                                                {member.inviteStatus}
                                            </Badge>
                                            <Badge variant="secondary">
                                                {member.role}
                                            </Badge>
                                        </div>
                                    </section>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    <RemoveMember
                                        team={team.name}
                                        email={member.info.email}
                                    />
                                    <MoveToTeamSelector
                                        fromTeam={team.name}
                                        email={member.info.email}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </section>
                </section>
                <section className="mx-auto mt-16 w-full max-w-sm">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="delete-team">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Remove Team
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-4">
                                    Deleting this project will remove it from
                                    your workspace. Make sure you won't need it
                                    anymore
                                </p>
                                <RemoveTeam team={team.name} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="change-team-lead">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Change Team Lead
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2 pb-4">
                                <ChangeTeamLeadForm
                                    teamName={team.name}
                                    membersList={team.members as ITeamMember[]}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </Container>
        </main>
    );
}
