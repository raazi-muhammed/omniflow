import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <Container className="flex min-h-screen justify-around">
            <section className="hidden flex-col justify-between object-center py-24 md:flex">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-14 w-36" />
            </section>
            <Skeleton className="my-auto h-96 w-full max-w-md p-4" />
        </Container>
    );
}
