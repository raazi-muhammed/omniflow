"use client";

import Avatar from "../custom/Avatar";
import Container from "./Container";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logUser } from "@/redux/features/authSlice";
import { useToast } from "../ui/use-toast";
import { UserDropDownMenu } from "./UserDropDownMenu";
import { getCurrentUser } from "@/services/user.service";

function Navbar() {
    const { toast } = useToast();
    const userData = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        getCurrentUser()
            .then((response) => {
                dispatch(logUser(response.data));
                toast({
                    description: response.message || "Internal server error",
                });
            })
            .catch((error) => {
                toast({
                    description: error || "Internal server error",
                });
            });
    }, [dispatch, toast]);
    return (
        <section
            className={`sticky top-0 z-40 flex min-h-20 rounded-none border bg-black/50 backdrop-blur-lg`}>
            <Container className="my-auto h-fit">
                <nav className="my-auto ms-auto flex w-fit gap-8">
                    <div className="ms-auto flex gap-4">
                        {userData.userData ? (
                            <>
                                <div className="rounded-full border border-primary">
                                    <Avatar
                                        name={userData.userData.name}
                                        src={userData.userData.avatar || ""}
                                    />
                                </div>
                                <div>
                                    <p>{userData.userData?.name}</p>
                                    <small className="-mt-1 flex text-secondary">
                                        {userData.userData?.email}
                                    </small>
                                </div>
                                <UserDropDownMenu
                                    username={userData.userData.username}
                                />
                            </>
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
