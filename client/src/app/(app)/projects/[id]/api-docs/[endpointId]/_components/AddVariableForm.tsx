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
import { inviteMemberToTeam } from "@/services/team.service";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/redux/store";
import { getPublicUser } from "@/services/user.service";
import { IUser } from "@/types/database";
import { useRouter } from "next/navigation";
import { AddIcon } from "@/lib/icons";

const formSchema = z.object({
    email: z.string().email(),
    message: z.string().min(5),
});

export default function AddVariableForm() {
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        /* getPublicUser({ email: values.email })
            .then((response) => {
                const userDetails: IUser = response.data;

                if (!userDetails.email || !userDetails.name) {
                    form.setError("email", { message: "Invalid user" });
                    return;
                }
                inviteMemberToTeam({
                    email: userDetails.email,
                    username: userDetails.username,
                    avatar: userDetails.avatar,
                    name: userDetails.name,
                    message: values.message,
                })
                    .then((response) => {
                        toast({
                            description: response?.message || "Success",
                        });
                        router.back();
                        router.refresh();
                    })
                    .catch((error) => {
                        toast({
                            description: error || "Error",
                        });
                    });
            })
            .catch((error) => {
                const sanitizedError: string = error.toLowerCase();
                if (sanitizedError.includes("user")) {
                    form.setError("email", { message: error });
                } else {
                    toast({
                        description: error || "Error",
                    });
                }
            }); */
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full gap-4">
                <div className="grid w-full grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
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
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
