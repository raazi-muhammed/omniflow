import Heading from "@/components/custom/Heading";
import Container from "@/components/layout/Container";
import { Card } from "@/components/ui/card";

export default function page() {
    return (
        <Container>
            <Heading>Docs</Heading>
            <section className="space-y-4">
                <Card className="flex">
                    <div className="flex min-w-20 rounded-l-lg border-r bg-card-to px-3">
                        <p className="my-auto">PATCH</p>
                    </div>
                    <div className="mx-4 my-2 flex flex-col gap-0">
                        <p className="font-bold">Get users</p>
                        <small className="text-secondary">api/v1/users</small>
                    </div>
                </Card>
                <Card className="flex">
                    <div className="flex min-w-20 rounded-l-lg border-r bg-card-to px-3">
                        <p className="m-auto">GET</p>
                    </div>
                    <div className="mx-4 my-2 flex flex-col gap-0">
                        <p className="font-bold">Get users</p>
                        <small className="text-secondary">api/v1/users</small>
                    </div>
                </Card>
            </section>
        </Container>
    );
}
