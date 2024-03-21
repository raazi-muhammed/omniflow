import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTeamMembers } from "@/services/team.service";
import { ITeam, ITeamMember, InviteStatus, Role } from "@/types/database";
import { Trash2 as DeleteIcon, RefreshCw as ChangeIcon } from "lucide-react";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ChangeTeamLeadForm from "./_forms/ChangeTeamLeadForm";

import RemoveTeam from "./_components/RemoveTeam";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import MemberActionDropDown from "./_components/MemberActionDropDown";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { Label } from "@/components/ui/label";
import Container from "@/components/layout/Container";
import { formatConstants } from "@/lib/formaters";

export async function getTeamsData(teamName: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getTeamMembers(
        {
            teamName,
        },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
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
            <Container>
                <SectionSplitter>
                    <SectionContent>
                        <Heading variant="spaced">{team.name}</Heading>
                        <section className="grid grid-cols-2 gap-4">
                            {team.members.map((member) => (
                                <Card>
                                    <CardContent className="mt-4 flex justify-between gap-4 pe-2">
                                        <div className="flex w-full gap-2">
                                            <div className="my-auto">
                                                <Avatar
                                                    name={member.info.name}
                                                    src={
                                                        member.info.avatar || ""
                                                    }
                                                />
                                            </div>
                                            <section>
                                                <p>{member.info.name}</p>
                                                <Label>
                                                    {member.info.email}
                                                </Label>
                                                <div className="mt-2 flex gap-2">
                                                    <Badge variant="secondary">
                                                        {formatConstants(
                                                            member.inviteStatus
                                                        )}
                                                    </Badge>
                                                    <Badge variant="secondary">
                                                        {formatConstants(
                                                            member.role
                                                        )}
                                                    </Badge>
                                                </div>
                                            </section>
                                        </div>
                                        {member.role !== Role.MAIN_TEAM_LEAD ? (
                                            <MemberActionDropDown
                                                disableMoveTo={
                                                    member.inviteStatus !=
                                                    InviteStatus.ACCEPTED
                                                }
                                                teamName={team.name}
                                                memberEmail={member.info.email}
                                            />
                                        ) : (
                                            <p>ho</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                            {team.members.length <= 0 && (
                                <ErrorMessage
                                    type="info"
                                    message={`There are no members on ${team.name}`}
                                />
                            )}
                        </section>
                    </SectionContent>
                    <SectionAside>
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-xl border bg-card p-1">
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
                                <AccordionContent className="px-4">
                                    <p className="mb-4">
                                        Deleting this project will remove it
                                        from your workspace. Make sure you won't
                                        need it anymore
                                    </p>
                                    <RemoveTeam team={team.name} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="change-team-lead">
                                <AccordionTrigger>
                                    <div className="flex gap-2">
                                        <ChangeIcon
                                            size="1.2em"
                                            className="my-auto"
                                        />
                                        Change Team Lead
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-2 pb-4">
                                    <ChangeTeamLeadForm
                                        teamName={team.name}
                                        membersList={
                                            team.members as ITeamMember[]
                                        }
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </SectionAside>
                </SectionSplitter>
            </Container>
        </main>
    );
}
