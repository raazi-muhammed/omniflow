import Heading from "@/components/custom/Heading";
import {
    SectionAside,
    SectionContent,
    SectionSplitter,
} from "@/components/layout/SectinSplitter";
import { Card } from "@/components/ui/card";
import { PROJECT_TOKEN_COOKIE, USER_TOKEN_COOKIE } from "@/constants/cookies";
import { getEndpoint } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import { cookies } from "next/headers";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DeleteIcon } from "lucide-react";
import AddVariableForm from "./_components/AddVariableForm";

async function getEndpointData(id: string) {
    const userToken = cookies().get(USER_TOKEN_COOKIE)?.value;
    const projectToken = cookies().get(PROJECT_TOKEN_COOKIE)?.value;

    const response = await getEndpoint(
        { id },
        {
            headers: {
                Authorization: `Bearer ${userToken}`,
                Project: `Bearer ${projectToken}`,
            },
        }
    );
    return response.data;
}

export default async function page({
    params,
}: {
    params: { endpointId: string };
}) {
    const endpointData: IEndpoint = await getEndpointData(params.endpointId);
    return (
        <>
            <SectionSplitter>
                <SectionContent>
                    <Heading variant="spaced">Variables</Heading>
                    <section className="grid grid-cols-2 gap-4">
                        {endpointData.variables.map((v) => (
                            <Card className="h-fit p-4 px-6">
                                <div className="mb-2 flex justify-between gap-2">
                                    <div className="flex-1">
                                        <small className="text-secondary">
                                            Name
                                        </small>
                                        <p>{v.name}</p>
                                    </div>
                                    <div className="flex-1">
                                        <small className="text-secondary">
                                            Type
                                        </small>
                                        <p>{v.type}</p>
                                    </div>
                                </div>
                                <small className="text-secondary">
                                    Description
                                </small>
                                <p>{v.description}</p>
                            </Card>
                        ))}
                    </section>
                </SectionContent>
                <SectionAside>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="delete-team">
                            <AccordionTrigger>
                                <div className="flex gap-2">
                                    <DeleteIcon
                                        size="1.2em"
                                        className="my-auto"
                                    />
                                    Add variable
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <AddVariableForm
                                    endpointId={endpointData.id || ""}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </SectionAside>
            </SectionSplitter>
        </>
    );
}
