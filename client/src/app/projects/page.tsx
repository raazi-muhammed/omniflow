import Avatar from "@/components/custom/Avatar";
import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AddIcon } from "@/lib/icons";
import Link from "next/link";

export default function page() {
    return (
        <Container>
            <section className="flex gap-2 ms-auto w-fit my-8">
                <Link href="/projects/add-project">
                    <Button size="sm">
                        <AddIcon />
                        Add a project
                    </Button>
                </Link>
            </section>
            <Heading>Projects</Heading>
            <section className="grid grid-cols-3">
                <Card>
                    <CardHeader className="text-secondary">
                        <p className="text-xl text-foreground font-semibold">
                            Shop Nexus
                        </p>
                        <small>This is a simple commerce application</small>
                    </CardHeader>
                    <CardContent className="flex">
                        <section className="ms-auto flex gap-2">
                            <Avatar
                                size="sm"
                                src="https://github.com/shadcn.png"
                            />
                            <Avatar
                                size="sm"
                                src="https://github.com/shadcn.png"
                            />
                        </section>
                    </CardContent>
                </Card>
            </section>
        </Container>
    );
}
