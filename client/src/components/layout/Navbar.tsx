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
import { UserService } from "@/services/api/user.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/utils";

function Navbar() {
    const { toast } = useToast();
    const userData = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const service = new UserService();

        makeApiCall(() => service.getCurrentUser().exec(), {
            toast,
            afterSuccess: (response: IResponse) => {
                dispatch(logUser(response.data));
            },
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
