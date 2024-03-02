import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import API from "@/lib/client";
import { IUser } from "@/types/database";
import { cookies } from "next/headers";
import ProfileCard from "./ProfileCard";
import Avatar from "@/components/custom/Avatar";

export async function getUserData() {
    const api = new API();
    const response = await api
        .user()
        .get("/get-profile", { headers: { Cookie: cookies().toString() } });

    console.log(response);

    return response?.data;
}

export default async function page() {
    const user: IUser = (await getUserData()) as IUser;
    return (
        <main>
            <Container className="max-w-lg">
                <Heading className="mt-12">Profile</Heading>
                <div className="m-4 grid place-items-center">
                    <Avatar size="lg" src={user.avatar || ""} />
                </div>
                <section className="space-y-2">
                    <ProfileCard title="Name">
                        <p>{user.name}</p>
                    </ProfileCard>
                    <ProfileCard title="Username">
                        <p>{user.username}</p>
                    </ProfileCard>
                    <ProfileCard title="Email">
                        <p>{user.email}</p>
                    </ProfileCard>
                </section>
            </Container>
        </main>
    );
}
