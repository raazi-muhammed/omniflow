import Heading from "@/components/custom/Heading";
import { IUser } from "@/types/database";
import Avatar from "@/components/custom/Avatar";
import { UserService } from "@/services/api/user.service";
import { cookies } from "next/headers";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    UserRound as ProfileIcon,
    Key as ChangePasswordIcon,
} from "lucide-react";
import EditProfileForm from "./_forms/EditProfileForm";
import ChangePasswordForm from "./_forms/ChangePasswordForm";
import { USER_TOKEN_COOKIE } from "@/constants/cookies";
import { Label } from "@/components/ui/label";
import Container from "@/components/layout/Container";

async function getUserData(username: string) {
    const token = cookies().get(USER_TOKEN_COOKIE)?.value;

    const service = new UserService({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const response = await service.getUserProfile(username).exec();
    return response?.data;
}

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const user: IUser = (await getUserData(params.username)) as IUser;
    return (
        <main>
            <Container>
                <SectionSplitter>
                    <SectionContent>
                        <Heading variant="spaced">Profile</Heading>
                        <Avatar
                            name={user.name}
                            size="lg"
                            src={user.avatar || ""}
                        />
                        <br />
                        <Label>Name</Label>
                        <p>{user.name}</p>
                        <br />
                        <Label>Username</Label>
                        <p>{user.username}</p>
                        <br />
                        <Label>Email</Label>
                        <p>{user.email}</p>
                    </SectionContent>
                    <SectionAside>
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-xl border bg-card p-1">
                            <AccordionItem value="edit-profile">
                                <AccordionTrigger>
                                    <div className="flex gap-2">
                                        <ProfileIcon
                                            size="1.2em"
                                            className="my-auto"
                                        />
                                        Edit profile
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-2 pb-4">
                                    <EditProfileForm user={user} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="change-password">
                                <AccordionTrigger>
                                    <div className="flex gap-2">
                                        <ChangePasswordIcon
                                            size="1.2em"
                                            className="my-auto"
                                        />
                                        Change password
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-2 pb-4">
                                    <ChangePasswordForm
                                        username={user.username}
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
