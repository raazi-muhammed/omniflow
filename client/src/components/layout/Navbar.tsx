"use client";

import Avatar from "../custom/Avatar";
import { Card } from "../ui/card";
import Container from "./Container";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect } from "react";
import API from "@/lib/client";
import { useDispatch } from "react-redux";
import { logUser } from "@/redux/features/authSlice";
import { useToast } from "../ui/use-toast";
import { UserDropDownMenu } from "./UserDropDownMenu";

function Navbar() {
    const { toast } = useToast();
    const userData = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const api = new API();
        api.user()
            .get("/current-user")
            .then((response) => {
                dispatch(logUser(response.data));
                toast({
                    description: response.message || "Internal server error",
                });
            });
    }, []);
    return (
        <Card className="rounded-none p-4">
            <Container>
                <nav className="ms-auto flex w-fit gap-8">
                    <div className="ms-auto flex gap-4">
                        {userData.userData ? (
                            <>
                                <Avatar src="https://github.com/shadcn.png" />
                                <div>
                                    <p>{userData.userData?.name}</p>
                                    <small className="-mt-1 flex text-secondary">
                                        {userData.userData?.email}
                                    </small>
                                </div>

                                <UserDropDownMenu />
                            </>
                        ) : (
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </Container>
        </Card>
    );
}

export default Navbar;
