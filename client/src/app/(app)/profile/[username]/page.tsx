import Heading from "@/components/custom/Heading";
import { IUser } from "@/types/database";
import Avatar from "@/components/custom/Avatar";
import { getUserProfile } from "@/services/user.service";
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

export async function getUserData(username: string) {
    const response = await getUserProfile(username, {
        headers: { Cookie: cookies().toString() },
    });
    return response?.data;
}

export default async function page({
    params,
}: {
    params: { username: string };
}) {
    const user: IUser = (await getUserData(params.username)) as IUser;
    return (
        <main>
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">Profile</Heading>
                    <Avatar
                        name={user.name}
                        size="lg"
                        src={user.avatar || ""}
                    />
                    <br />
                    <small className="text-secondary">Name</small>
                    <p>{user.name}</p>
                    <br />
                    <small className="text-secondary">Username</small>
                    <p>{user.username}</p>
                    <br />
                    <small className="text-secondary">Email</small>
                    <p>{user.email}</p>
                </SectionContent>
                <SectionAside>
                    <Accordion type="single" collapsible>
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
                                <ChangePasswordForm username={user.username} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </main>
    );
}
