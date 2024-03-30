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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { logger } from "@/lib/logger";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    apiDoc: z.number(),
    modules: z.number(),
});

export default function EditMemberAccessForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apiDoc: 0,
            modules: 0,
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        logger.debug(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="apiDoc"
                    render={({ field }) => (
                        <FormItem className="border-lg flex justify-between gap-4 rounded-lg bg-muted/50 p-2 align-middle">
                            <div className="my-auto">
                                <FormLabel className="my-auto text-base font-normal text-foreground">
                                    API Docs
                                </FormLabel>
                                <Label className="ms-2 block">
                                    Change access to API docs
                                </Label>
                            </div>
                            <div>
                                <Select
                                    onValueChange={(e) => {
                                        field.onChange(Number(e));
                                    }}
                                    defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 w-32">
                                            <SelectValue placeholder="Access" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            No access
                                        </SelectItem>
                                        <SelectItem value="1">
                                            Can view
                                        </SelectItem>
                                        <SelectItem value="2">
                                            Can edit
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="modules"
                    render={({ field }) => (
                        <FormItem className="border-lg flex justify-between gap-4 rounded-lg bg-muted/50 p-2 align-middle">
                            <div className="my-auto">
                                <FormLabel className="my-auto text-base font-normal text-foreground">
                                    Modules
                                </FormLabel>
                                <Label className="ms-2 block">
                                    Change access to modules
                                </Label>
                            </div>
                            <div>
                                <Select
                                    onValueChange={(e) => {
                                        field.onChange(Number(e));
                                    }}
                                    defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 w-32">
                                            <SelectValue placeholder="Access" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">
                                            No access
                                        </SelectItem>
                                        <SelectItem value="1">
                                            Can view
                                        </SelectItem>
                                        <SelectItem value="2">
                                            Can edit
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="ms-auto flex">
                    Save changes
                </Button>
            </form>
        </Form>
    );
}
