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
import { IUser } from "@/types/database";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { editUserProfile } from "@/services/user.service";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    picture: z.any(),
});

export default function EditProfileForm({ user }: { user: IUser }) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
        },
        mode: "onTouched",
    });

    const { isDirty, isValid } = form.formState;

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = new FormData();
        data.append("name", values.name);
        if (values.picture) {
            data.append("avatar", values.picture[0]);
        }
        editUserProfile(user.username, data)
            .then((response) => {
                toast({
                    description: response.message || "Profile edited",
                });
                router.refresh();
            })
            .catch((error) => {
                toast({
                    title: "Cannot edit profile",
                    description: error || "Internal server error",
                });
            });
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
                    name="picture"
                    render={({}) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    {...form.register("picture")}
                                    type="file"
                                    accept="images/*"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={!isDirty || !isValid}
                    className="w-full"
                    type="submit">
                    Save
                </Button>
            </form>
        </Form>
    );
}
