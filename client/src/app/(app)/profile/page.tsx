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
import { DeleteIcon } from "lucide-react";
import EditProfileForm from "./EditProfileForm";

export async function getUserData() {
    const response = await getUserProfile({
        headers: { Cookie: cookies().toString() },
    });
    return response?.data;
}

export default async function page() {
    const user: IUser = (await getUserData()) as IUser;
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
                        <AccordionItem value="delete-project">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
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
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </main>
    );
}
