"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { IEndpoint } from "@/types/database";
import { Dispatch, SetStateAction } from "react";
import { ApiDocService } from "@/services/api/api-doc.service";
import { makeApiCall } from "@/lib/apicaller";
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { canSubmitFrom } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    summary: z.string().optional(),
    route: z.string().min(3, "Invalid"),
    method: z.string(),
});

export default function EditEndpointForm({
    endpoint,
    setOpen,
    handleDelete,
}: {
    handleDelete: () => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
    endpoint: IEndpoint;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: endpoint.name,
            summary: endpoint?.summary || "",
            route: endpoint.route,
            method: endpoint.method,
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new ApiDocService();
        await makeApiCall(
            () => service.editEndpoint(endpoint.id, values).exec(),
            {
                toast,
                afterSuccess: () => {
                    setOpen(false);
                    router.refresh();
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="route"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Route</FormLabel>
                            <FormControl>
                                <Input placeholder="route" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Module</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        placeholder="module"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="GET">GET</SelectItem>
                                        <SelectItem value="POST">
                                            POST
                                        </SelectItem>
                                        <SelectItem value="PUT">PUT</SelectItem>
                                        <SelectItem value="PATCH">
                                            PATCH
                                        </SelectItem>
                                        <SelectItem value="DELETE">
                                            DELETE
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea placeholder="summary" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex w-full justify-between gap-4">
                    <DeleteAlert handleDelete={handleDelete} />
                    <div className="flex gap-4">
                        <Button
                            onClick={() => setOpen(false)}
                            type="button"
                            variant="outline">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={canSubmitFrom(form, { type: "edit" })}>
                            <AnimatedSpinner
                                isLoading={form.formState.isSubmitting}
                            />
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
