"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
    email: z.string().email(),
    message: z.string(),
});

export default function AddSchemaForm() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: "",
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {}

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full gap-4">
                <div className="flex w-full gap-4">
                    <FormField
                        control={form.control}
                        name="email"
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
                        name="message"
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
                        type="multiple"
                        variant="outline"
                        className="mb-auto mt-[1.65rem] gap-4">
                        <ToggleGroupItem className="h-12 w-12" value="optional">
                            ?
                        </ToggleGroupItem>
                        <ToggleGroupItem className="h-12 w-12" value="required">
                            *
                        </ToggleGroupItem>
                        <ToggleGroupItem className="h-12 w-12" value="unique">
                            U
                        </ToggleGroupItem>
                        <ToggleGroupItem className="h-12 w-12" value="key">
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
