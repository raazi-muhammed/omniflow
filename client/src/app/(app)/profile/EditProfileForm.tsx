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
import API from "@/lib/client";
import { useToast } from "@/components/ui/use-toast";
import { IUser } from "@/types/database";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
});

export default function EditProfileForm({ user }: { user: IUser }) {
    const { toast } = useToast();
    const router = useRouter();
    const [image, setImage] = useState<File>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = new FormData();
        data.append("name", values.name);
        if (image) {
            data.append("avatar", image);
        }

        const api = new API();
        const response = await api.user().post("/edit-profile", {
            data,
        });
        console.log(response);

        if (response.success) {
            toast({
                description: response.message || "Profile edited",
            });
            router.refresh();
        } else {
            toast({
                title: "Cannot edit profile",
                description: response.message || "Internal server error",
            });
        }
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
                <Input
                    // @ts-ignore
                    onChange={(e) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    type="file"
                    accept="images/*"
                />

                <Button className="w-full" type="submit">
                    Edit
                </Button>
            </form>
        </Form>
    );
}
