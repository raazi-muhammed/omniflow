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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { inviteMemberToTeam } from "@/services/team.service";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    email: z.string().email(),
});

export default function InviteMemberForm() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        inviteMemberToTeam(values)
            .then((response) => {
                toast({
                    description: response?.message || "Login successful",
                });

                //router.push("/projects");
            })
            .catch((error) => {
                toast({
                    title: "Login failed",
                    description: error || "Login successful",
                });
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={!form.formState.isValid}
                    className="w-full"
                    type="submit">
                    Invite
                </Button>
            </form>
        </Form>
    );
}
