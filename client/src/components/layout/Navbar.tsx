"use client";

import Avatar from "../custom/Avatar";
import { Card } from "../ui/card";
import Container from "./Container";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import Link from "next/link";

function Navbar() {
    const userData = useAppSelector((state) => state.authReducer);

    return (
        <Card className="rounded-none p-4">
            <Container>
                <nav className="flex ms-auto w-fit gap-8">
                    <div className="ms-auto flex gap-4">
                        {userData.userData ? (
                            <>
                                <Avatar src="https://github.com/shadcn.png" />
                                <div>
                                    <p>{userData.userData?.name}</p>
                                    <small className="text-secondary flex -mt-1">
                                        {userData.userData?.email}
                                    </small>
                                </div>
                                <ChevronDownIcon
                                    size="1em"
                                    className="my-auto text-secondary"
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
        </Card>
    );
}

export default Navbar;
