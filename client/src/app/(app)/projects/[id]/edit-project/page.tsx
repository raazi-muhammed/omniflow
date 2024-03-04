import Container from "@/components/layout/Container";
import EditProjectForm from "./EditProjectForm";
import { Button } from "@/components/ui/button";
import DeleteProject from "./DeleteProject";
import Heading from "@/components/custom/Heading";
import FormWrapper from "@/components/layout/FormWrapper";
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
import ChangeProjectLeadForm from "./ChangeProjectLeadForm";

export default function page() {
    return (
        <main className="w-full">
            <Container className="flex">
                <FormWrapper>
                    <Heading variant="spaced">Edit Project</Heading>
                    <EditProjectForm />
                </FormWrapper>
                <section className="mx-auto mt-16 w-96">
                    <Accordion type="single" collapsible>
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
                            <AccordionContent>
                                <p className="mb-4">
                                    Deleting this project will remove it from
                                    your workspace. Make sure you won't need it
                                    anymore
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
                            <AccordionContent className="p-2">
                                <ChangeProjectLeadForm />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </Container>
        </main>
    );
}
