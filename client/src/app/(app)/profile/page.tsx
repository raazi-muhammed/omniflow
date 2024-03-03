import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { IUser } from "@/types/database";
import ProfileCard from "./ProfileCard";
import Avatar from "@/components/custom/Avatar";
import EditProfile from "./EditProfile";
import { getUserProfile } from "@/services/user.service";
import { cookies } from "next/headers";

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
            <Container className="max-w-lg">
                <Heading className="mt-12">Profile</Heading>

                <Card>
                    <CardContent className="pt-8">
                        <div className="mb-4 grid place-items-center">
                            <Avatar
                                name={user.name}
                                size="lg"
                                src={user.avatar || ""}
                            />
                        </div>
                        <ProfileCard title="Name">
                            <p>{user.name}</p>
                        </ProfileCard>
                        <ProfileCard title="Username">
                            <p>{user.username}</p>
                        </ProfileCard>
                        <ProfileCard title="Email">
                            <p>{user.email}</p>
                        </ProfileCard>
                    </CardContent>
                </Card>
                <EditProfile user={user} />
            </Container>
        </main>
    );
}
