import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <section className="mt-24 flex w-full flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </section>
    );
}
