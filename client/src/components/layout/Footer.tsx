import React from "react";
import Container from "./Container";
import Heading from "../custom/Heading";
import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-14">
            <Container className="flex flex-col justify-between gap-8 md:flex-row">
                <div className="grid gap-0">
                    <Heading>Omniflow</Heading>
                    <p>Build projects faster</p>
                </div>
                <div className="mt-auto grid gap-0 md:text-right">
                    <small>Created by</small>
                    <Link
                        href="https://raazi.live/"
                        className="flex gap-2 align-middle text-primary md:ms-auto">
                        <Globe size="1.1em" className="my-auto" />
                        <p className="font-bold underline">Raazi muhammed</p>
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
