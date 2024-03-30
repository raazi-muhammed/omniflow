import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import { ITeam } from "@/types/database";
import { cookies } from "next/headers";
import Link from "next/link";
import ActionItemsContainer from "@/components/layout/ActionItemsContainer";
import ErrorMessage from "@/components/custom/ErrorMessage";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { TeamService } from "@/services/api/team.service";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Card } from "@/components/ui/card";
import CustomLink from "@/components/custom/CustomLink";

async function loadTeams() {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const service = new TeamService({
        headers: {
            Authorization: `Bearer ${userToken}`,
            Project: `Bearer ${projectToken}`,
        },
    });
    const response = await service.getTeams().exec();

    return response.data;
}

export default async function page() {
    const teams: ITeam[] = await loadTeams();
    return (
        <Container>
            <SectionSplitter>
                <SectionAside className="mt-0">
                    <ActionItemsContainer>
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
                    <section className="space-y-4">
                        {teams.map((team) => (
                            <Card className="p-4">
                                <section className="flex justify-between">
                                    <CustomLink href={`teams/${team.name}`}>
                                        {team.name}
                                    </CustomLink>
                                </section>
                            </Card>
                        ))}
                    </section>
                </SectionAside>
                <SectionContent>
                    <div className="h-screen-without-navbar mx-8 flex align-middle">
                        <ErrorMessage
                            type="info"
                            message="Please select an point"
                        />
                    </div>
                </SectionContent>
            </SectionSplitter>
        </Container>
    );
}
