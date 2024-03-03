import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";

export default function page() {
    return (
        <div className="w-full">
            <Container>
                <section className="my-8 ms-auto flex w-fit justify-end gap-4">
                    <Link href="/projects/add-project">
                        <Button size="sm" variant="secondary">
                            <AddIcon />
                            Invite an member
                        </Button>
                    </Link>
                    <Link href="/projects/add-project">
                        <Button size="sm">
                            <AddIcon />
                            Add a team
                        </Button>
                    </Link>
                </section>
                <Heading>Teams</Heading>
            </Container>
        </div>
    );
}
