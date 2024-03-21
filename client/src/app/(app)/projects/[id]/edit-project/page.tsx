import EditProjectForm from "./_forms/EditProjectForm";
import DeleteProject from "./_components/DeleteProject";
import Heading from "@/components/custom/Heading";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Trash2 as DeleteIcon,
    RefreshCw as ChangeRoleIcon,
} from "lucide-react";
import ChangeProjectLeadForm from "./_forms/ChangeProjectLeadForm";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import Container from "@/components/layout/Container";

export default function page() {
    return (
        <main className="w-full">
            <Container>
                <SectionSplitter>
                    <SectionContent>
                        <Heading variant="spaced">Edit Project</Heading>
                        <EditProjectForm />
                    </SectionContent>
                    <SectionAside>
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-xl border bg-card p-1">
                            <AccordionItem value="delete-project">
                                <AccordionTrigger>
                                    <div className="flex gap-2">
                                        <DeleteIcon
                                            size="1.2em"
                                            className="my-auto"
                                        />
                                        Delete Project
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4">
                                    <p className="mb-4">
                                        Deleting this project will remove it
                                        from your workspace. Make sure you
                                        won&apos;t need it anymore
                                    </p>
                                    <DeleteProject />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="change-project-lead">
                                <AccordionTrigger>
                                    <div className="flex gap-2">
                                        <ChangeRoleIcon
                                            size="1.2em"
                                            className="my-auto"
                                        />
                                        Change Project lead
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-2 pb-8">
                                    <ChangeProjectLeadForm />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </SectionAside>
                </SectionSplitter>
            </Container>
        </main>
    );
}
