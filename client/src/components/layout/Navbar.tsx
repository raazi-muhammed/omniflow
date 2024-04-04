"use client";

import Avatar from "../custom/Avatar";
import Container from "./Container";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logUser, logout } from "@/redux/features/authSlice";
import { useToast } from "../ui/use-toast";
import { UserService } from "@/services/api/user.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Label } from "../ui/label";
import {
    CircleUserRound as ProfileIcon,
    WalletCards as ProjectIcon,
    LogOut as LogOutIcon,
} from "lucide-react";
import { AuthService } from "@/services/api/auth.service";
import { useRouter } from "next/navigation";
import { TeamService } from "@/services/api/team.service";

function Navbar() {
    const { toast } = useToast();
    const router = useRouter();
    const userData = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const service = new UserService();
        const teamService = new TeamService();

        makeApiCall(() => service.getCurrentUser().exec(), {
            toast,
            afterSuccess: (response: IResponse) => {
                dispatch(logUser(response.data));
            },
        });

        makeApiCall(
            () =>
                teamService
                    .getMemberAccess({
                        username: userData.userData?.username || "asdf",
                    })
                    .exec(),
            {
                toast,
                afterSuccess: (response: IResponse) => {
                    console.log(response.data);
                },
            }
        );
    }, [dispatch, toast]);

    function handleLogout() {
        const service = new AuthService();
        makeApiCall(() => service.userLogOut().exec(), {
            toast,
            afterSuccess: () => {
                dispatch(logout());
                router.push("/login");
            },
        });
    }

    return (
        <section
            className={`sticky top-0 z-40 flex min-h-20 rounded-none border bg-black/50 backdrop-blur-lg`}>
            <Container className="my-auto h-fit">
                <nav className="my-auto ms-auto flex w-fit gap-8">
                    <div className="ms-auto flex gap-4">
                        {userData.userData ? (
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="flex h-full gap-2">
                                            <div className="flex gap-4 rounded-full border border-primary">
                                                <Avatar
                                                    name={
                                                        userData.userData.name
                                                    }
                                                    src={
                                                        userData.userData
                                                            .avatar || ""
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <p>{userData.userData?.name}</p>
                                                <small className="-mt-1 flex text-secondary">
                                                    {userData.userData?.email}
                                                </small>
                                            </div>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="w-full p-2">
                                            <section className="w-full rounded-sm p-2 hover:bg-muted">
                                                <Link
                                                    href={`/profile/${userData.userData.username}`}>
                                                    <div className="flex gap-2">
                                                        <ProfileIcon
                                                            size="1.2rem"
                                                            className="my-auto"
                                                        />
                                                        <p className="my-auto">
                                                            Profile
                                                        </p>
                                                    </div>
                                                    <Label>
                                                        Edit and view your
                                                        profile details
                                                        effortlessly
                                                    </Label>
                                                </Link>
                                            </section>
                                            <section className="w-44 rounded-sm p-2 hover:bg-muted">
                                                <Link href={`/projects`}>
                                                    <div className="flex gap-2">
                                                        <ProjectIcon
                                                            size="1.2rem"
                                                            className="my-auto"
                                                        />
                                                        <p className="my-auto">
                                                            Projects
                                                        </p>
                                                    </div>
                                                    <Label>
                                                        Access and review all
                                                        your projects in one
                                                        place
                                                    </Label>
                                                </Link>
                                            </section>
                                            <section className="w-44 rounded-sm border-destructive-border p-2 hover:border hover:bg-destructive-to">
                                                <div
                                                    className="flex gap-2"
                                                    onClick={handleLogout}>
                                                    <LogOutIcon
                                                        size="1.2rem"
                                                        className="my-auto"
                                                    />
                                                    <p className="my-auto">
                                                        Logout
                                                    </p>
                                                </div>
                                            </section>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        ) : (
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </Container>
        </section>
    );
}

export default Navbar;
