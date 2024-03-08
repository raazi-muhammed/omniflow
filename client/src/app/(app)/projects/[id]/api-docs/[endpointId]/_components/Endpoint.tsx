"use client";

import Heading from "@/components/custom/Heading";
import { Button } from "@/components/ui/button";
import { getEndpoint } from "@/services/endpoints.service";
import { IEndpoint } from "@/types/database";
import { useEffect, useState } from "react";
import AddVariableForm from "./AddVariableForm";
import AddHeadersForm from "./AddHeadersForm";
import BodyComponent from "./BodyComponent";
import { Separator } from "@/components/ui/separator";
import AddSchemaForm from "./AddSchemaForm";

export default function Endpoint({ endpointId }: { endpointId: string }) {
    const [endpoint, setEndpoint] = useState<IEndpoint | null>(null);

    useEffect(() => {
        getEndpoint({ id: endpointId }).then((res) => {
            setEndpoint(res.data);
        });
    }, []);
    return (
        <main className="w-full space-y-6">
            {endpoint ? (
                <>
                    <Heading>{endpoint.name}</Heading>
                    <section className="grid grid-cols-3">
                        <div>
                            <small className="text-secondary">Method</small>
                            <p>{endpoint.method}</p>
                        </div>
                        <div>
                            <small className="text-secondary">URL</small>
                            <p>{endpoint.route}</p>
                        </div>
                        <div>
                            <small className="text-secondary">Summary</small>
                            <p>
                                {endpoint.summary
                                    ? endpoint.summary
                                    : "No summary"}
                            </p>
                        </div>
                    </section>
                    <Separator className="my-0" />
                    <div>
                        <Heading variant="sm">Variables</Heading>
                        <AddVariableForm />
                    </div>
                    <div>
                        <Heading variant="sm">Headers</Heading>
                        <AddHeadersForm />
                    </div>
                    <div>
                        <Heading variant="sm">Body</Heading>
                        <BodyComponent />
                    </div>
                    <section>
                        <Heading variant="sm">Schema</Heading>
                        <AddSchemaForm />
                    </section>
                </>
            ) : (
                <p>Hoooi</p>
            )}
        </main>
    );
}
