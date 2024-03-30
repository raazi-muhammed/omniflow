import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon, EditIcon } from "@/lib/icons";
import { IAllMemberList, IMemberStatus, ITeam } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { Fragment } from "react";
import { TeamService } from "@/services/api/team.service";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import RemoveMember from "./_components/RemoveMemberFromProject";
import RemoveMemberFromProject from "./_components/RemoveMemberFromProject";

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
                                <TableHead className="w-20">Actions</TableHead>
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
                                    <TableCell>{member.info.name}</TableCell>
                                    <TableCell>{member.info.email}</TableCell>
                                    <TableCell>
                                        {member.info.username}
                                    </TableCell>
                                    <TableCell>
                                        {formatConstants(member.inviteStatus)}
                                    </TableCell>
                                    <TableCell>
                                        {formatConstants(member.role)}
                                    </TableCell>
                                    <TableCell>
                                        <RemoveMemberFromProject
                                            memberId={member.info.id}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </Container>
        </div>
    );
}
