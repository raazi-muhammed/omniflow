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

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    lead: z.string().min(3, "Invalid"),
});

export default function AddTeamForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lead: "Raazi Muhammed",
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        /*  const api = new API();
        const response = await api.team().post("/add-team", { data: values });
        console.log(response); */
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                                <Input placeholder="team name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lead"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lead</FormLabel>
                            <FormControl>
                                <Input placeholder="team lead" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Add team
                </Button>
            </form>
        </Form>
    );
}
