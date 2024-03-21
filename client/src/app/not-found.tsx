import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grid min-h-screen w-full place-items-center">
            <section className="text-center">
                <h2 className="text-4xl font-bold">Not Found</h2>
                <Label className="my-4 flex">
                    Could not find requested resource
                </Label>
                <Link href="/">
                    <Button variant="muted">
                        <HomeIcon size="1.2em" className="me-2" />
                        Return Home
                    </Button>
                </Link>
            </section>
        </main>
    );
}
