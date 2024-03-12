"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRouter } from "next/navigation";
import { AddIcon } from "@/lib/icons";
import { useState } from "react";
import { EDataTypes } from "@/types/database";
import {
    addEndpointResponse,
    addEndpointSchema,
} from "@/services/endpoints.service";
import CodeEditor from "@uiw/react-textarea-code-editor";

const formSchema = z.object({
    statusCode: z.string().min(1, "Invalid"),
    description: z.string().min(1, "Invalid"),
});

export default function AddResponseForm({
    endpointId,
}: {
    endpointId: string;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const [code, setCode] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            statusCode: "",
            description: "",
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        addEndpointResponse(
            { id: endpointId },
            {
                statusCode: Number(values.statusCode),
                description: values.description,
            }
        )
            .then((response) => {
                console.log(response);
                router.refresh();
                toast({ description: response.message });
            })
            .catch((err) => {
                console.log(err);
                toast({ description: err.message });
            });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-2">
                <FormField
                    control={form.control}
                    name="statusCode"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Status Code</FormLabel>
                            <FormControl>
                                <Input placeholder="status code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <CodeEditor
                    value={code}
                    language="json"
                    placeholder="Please enter your body code."
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    className="mt-2 rounded-lg border bg-card"
                    style={{
                        backgroundColor: "#0F0B0B",
                        fontSize: "0.875rem",
                        fontFamily:
                            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                />
                <Button
                    disabled={!form.formState.isValid}
                    className="mt-8 w-full"
                    type="submit">
                    <AddIcon />
                    Add
                </Button>
            </form>
        </Form>
    );
}
