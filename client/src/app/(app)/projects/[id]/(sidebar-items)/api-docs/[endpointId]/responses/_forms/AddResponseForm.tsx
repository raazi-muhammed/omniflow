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
import { useRouter } from "next/navigation";
import { AddIcon } from "@/lib/icons";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { contentTypes } from "@/types/database";
import { logger } from "@/lib/logger";
import { ApiDocService } from "@/services/api/api-doc.service";
import { makeApiCall } from "@/lib/apicaller";

const formSchema = z.object({
    statusCode: z.number().min(100, "Invalid").max(599, "Invalid"),

    description: z.string().min(1, "Invalid"),
    type: z.string().min(1, "Invalid"),
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
            description: "",
            type: "APPLICATION/JSON",
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        logger.debug(values);

        const service = new ApiDocService();
        makeApiCall(
            () =>
                service
                    .addEndpointResponse(endpointId, {
                        statusCode: values.statusCode,
                        description: values.description,
                        type: values.type,
                        body: code,
                    })
                    .exec(),
            {
                toast,
                afterSuccess: () => {
                    router.refresh();
                    form.reset();
                },
            }
        );
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
                                <Input
                                    placeholder="status code"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
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
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Content Type</FormLabel>
                            <Select
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {contentTypes.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel>Body</FormLabel>
                    <CodeEditor
                        value={code}
                        language="json"
                        placeholder="body"
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        className="mt-2 rounded-lg border bg-card"
                        style={{
                            backgroundColor: "#000",
                            fontSize: "0.875rem",
                            fontFamily:
                                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                    />
                </div>
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
