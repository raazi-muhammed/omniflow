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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EDataTypes, dataValueTypes } from "@/types/database";
import { TableService } from "@/services/api/table.service";
import { makeApiCall } from "@/lib/apicaller";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { HelpCircle, Key, Sparkles } from "lucide-react";
import { canSubmitFrom } from "@/lib/utils";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";

const formSchema = z.object({
    name: z.string().min(1, "Invalid"),
    type: z
        .string({
            required_error: "Please select a type.",
        })
        .min(1, "Invalid"),
    description: z.string().optional(),
    options: z.array(z.string()).optional().default([]),
});

export default function AddTableFieldForm({ tableId }: { tableId: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const [value, setValue] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "STRING",
            description: "",
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new TableService();
        await makeApiCall(() => service.addTableField(tableId, values).exec(), {
            toast,
            afterSuccess: () => {
                router.refresh();
                form.reset();
                setValue([]);
            },
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-2">
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
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
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
                                    {dataValueTypes.map((type) => (
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
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <FormLabel>Options</FormLabel>
                    <ToggleGroup
                        value={value}
                        onValueChange={(v) => {
                            if (v) {
                                form.setValue("options", v);
                                setValue(v);
                            }
                        }}
                        type="multiple"
                        variant="outline"
                        className="mt-1 grid grid-cols-3 gap-4">
                        <ToggleGroupItem
                            className="h-11"
                            value={EDataTypes.OPTIONAL}>
                            <HelpCircle
                                size="1em"
                                className="me-2 text-secondary"
                            />
                            Optional
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className="h-11"
                            value={EDataTypes.UNIQUE}>
                            <Sparkles
                                size="1em"
                                className="me-2 text-secondary"
                            />
                            Unique
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className="h-11"
                            value={EDataTypes.KEY}>
                            <Key size="1em" className="me-2 text-secondary" />
                            Key
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={canSubmitFrom(form)}>
                    <AnimatedSpinner isLoading={form.formState.isSubmitting} />
                    <AddIcon />
                    Add
                </Button>
            </form>
        </Form>
    );
}
