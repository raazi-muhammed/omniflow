import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="grid min-h-screen place-items-center">
            <div>
                <Heading>Hello, welcome to omniflow</Heading>
                <Link href="projects">
                    <Button className="mx-4">View Projects</Button>
                </Link>
                <Link href="login">
                    <Button variant="secondary">Login</Button>
                </Link>
            </div>
        </main>
    );
}
