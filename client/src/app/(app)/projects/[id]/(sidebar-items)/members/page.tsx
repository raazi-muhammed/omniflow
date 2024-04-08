import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import { IMemberStatus } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { TeamService } from "@/services/api/team.service";
import { formatConstants } from "@/lib/formaters";
import Avatar from "@/components/custom/Avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import RemoveMemberFromProject from "./_components/RemoveMemberFromProject";
import EditMemberAccess from "./_components/EditMemberAccess";
import AnimateButton from "@/components/animated/AnimateButton";
import ErrorMessage from "@/components/custom/ErrorMessage";

async function loadTeams() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TeamService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    const response = await service.getMembersList().exec();

    return response.data;
}

export default async function page() {
    const members: IMemberStatus[] = await loadTeams();
    return (
        <div className="w-full">
            <Container>
                <ActionItemsContainer>
                    <AnimateButton>
                        <Link href="teams/invite-member">
                            <Button size="sm" variant="muted">
                                <AddIcon />
                                Invite an member
                            </Button>
                        </Link>
                    </AnimateButton>
                    <AnimateButton>
                        <Link href="teams/add-team">
                            <Button size="sm">
                                <AddIcon />
                                Add a team
                            </Button>
                        </Link>
                    </AnimateButton>
                </ActionItemsContainer>
                {members.length ? (
                    <section className="grid gap-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Avatar</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Invite status</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="w-20">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.info.id}>
                                        <TableCell>
                                            <Avatar
                                                size="sm"
                                                src={member.info.avatar || ""}
                                                name={member.info.name}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {member.info.name}
                                        </TableCell>
                                        <TableCell>
                                            {member.info.email}
                                        </TableCell>
                                        <TableCell>
                                            {member.info.username}
                                        </TableCell>
                                        <TableCell>
                                            {formatConstants(
                                                member.inviteStatus
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {formatConstants(member.role)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <EditMemberAccess
                                                    user={member.info}
                                                />
                                                <RemoveMemberFromProject
                                                    memberId={member.info.id}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </section>
                ) : (
                    <ErrorMessage type="info" message="No member yet" />
                )}
            </Container>
        </div>
    );
}
