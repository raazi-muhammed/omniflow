import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <main className="mt-28 w-full">
            <SectionSplitter>
                <SectionContent className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                </SectionContent>
                <SectionAside className="space-y-4">
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                </SectionAside>
            </SectionSplitter>
        </main>
    );
}
