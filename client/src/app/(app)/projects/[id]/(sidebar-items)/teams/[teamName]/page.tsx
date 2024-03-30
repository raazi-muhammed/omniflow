import Heading from "@/components/custom/Heading";
import { TeamService } from "@/services/api/team.service";
import { ITeam, InviteStatus, Role } from "@/types/database";
import { Trash2 as DeleteIcon } from "lucide-react";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import RemoveTeam from "./_components/RemoveTeam";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { Card, CardContent } from "@/components/ui/card";
import Avatar from "@/components/custom/Avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatConstants } from "@/lib/formaters";
import MemberActionDropDown from "./_components/MemberActionDropDown";
import {
    PreviewActions,
    PreviewContent,
    PreviewHeader,
} from "@/components/layout/PreviewHeader";
import ChangeTeamLead from "./_components/ChangeTeamLead";
import EditTeam from "./_components/EditTeam";

async function getTeamData(teamName: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TeamService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    const response = await service
        .getTeam({
            name: teamName,
        })
        .exec();
    console.log(response.data);

    return response.data as ITeam;
}

export default async function page({
    params,
}: {
    params: { teamName: string };
}) {
    const team = await getTeamData(params.teamName);
    return (
        <main className="w-full">
            <PreviewActions>
                <EditTeam teamName={team.name} />
            </PreviewActions>
            <PreviewHeader>
                <PreviewContent>
                    <Heading> {team.name}</Heading>
                </PreviewContent>
            </PreviewHeader>
            {team.lead ? (
                <>
                    <Label>Lead</Label>
                    <Card className="flex gap-3 p-4">
                        <Avatar
                            src={team.lead.avatar || ""}
                            name={team.lead.name}
                        />
                        <div className="grid gap-0">
                            <p>{team.lead.name}</p>
                            <Label>{team.lead.email}</Label>
                        </div>
                        <ChangeTeamLead
                            teamName={team.name}
                            membersList={team.members}
                        />
                    </Card>
                </>
            ) : (
                <ErrorMessage type="info" message="No team lead" />
            )}
            <Heading variant="sm" className="mt-6">
                Members
            </Heading>
            <section className="mt-2 grid grid-cols-2 gap-4">
                {team.members.map((member) => (
                    <Card key={member.info.id}>
                        <CardContent className="mt-4 flex justify-between gap-4 pe-2">
                            <div className="flex w-full gap-2">
                                <div className="my-auto">
                                    <Avatar
                                        name={member.info.name}
                                        src={member.info.avatar || ""}
                                    />
                                </div>
                                <section>
                                    <p>{member.info.name}</p>
                                    <Label>{member.info.email}</Label>
                                    <div className="mt-2 flex gap-2">
                                        <Badge variant="secondary">
                                            {formatConstants(
                                                member.inviteStatus
                                            )}
                                        </Badge>
                                        <Badge variant="secondary">
                                            {formatConstants(member.role)}
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
                {team.members?.length <= 0 && (
                    <ErrorMessage
                        type="info"
                        message={`There are no members on ${team.name}`}
                    />
                )}
            </section>
        </main>
    );
}
