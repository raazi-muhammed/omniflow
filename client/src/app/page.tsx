import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <p>Hello world</p>
            <Link href="login">
                <Button>Login</Button>
            </Link>
        </main>
    );
}
