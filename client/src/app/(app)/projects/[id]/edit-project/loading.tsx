import Heading from "@/components/custom/Heading";
import FormWrapper from "@/components/layout/FormWrapper";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <main className="w-full">
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">Edit Project</Heading>
                    <FormWrapper className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </FormWrapper>
                </SectionContent>
                <SectionAside className="space-y-4">
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                </SectionAside>
            </SectionSplitter>
        </main>
    );
}
