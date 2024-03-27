import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LandingPage } from "./_components/LandingPage";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <LandingPage />
        </>
    );
}
