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

const formSchema = z.object({
    key: z.string().min(1, "Invalid"),
    type: z.string().min(1, "Invalid"),
    options: z.array(z.string()).optional().default([]),
});

export default function AddSchemaForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [value, setValue] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: "",
            type: "",
            options: [],
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full gap-4">
                <div className="flex w-full gap-4">
                    <FormField
                        control={form.control}
                        name="key"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="key" {...field} />
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
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="type" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        className="mb-auto mt-[1.65rem] gap-4">
                        <ToggleGroupItem
                            className="h-12 w-12"
                            value={EDataTypes.OPTIONAL}>
                            ?
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className="h-12 w-12"
                            value={EDataTypes.UNIQUE}>
                            U
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            className="h-12 w-12"
                            value={EDataTypes.KEY}>
                            K
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <Button
                    disabled={!form.formState.isValid}
                    className="mt-8 w-24"
                    type="submit">
                    <AddIcon />
                    Add
                </Button>
            </form>
        </Form>
    );
}
