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
import {
    Eye as ShowPasswordIcon,
    EyeOff as HidePasswordIcon,
} from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    username: z
        .string()
        .min(3, "Invalid")
        .refine((s) => /^[a-zA-Z0-9_-]+$/.test(s), {
            message: "Only letters & numbers are allowed",
        }),
    password: z.string().min(7, "Password should be at least 7 characters"),
    rememberMe: z.boolean().default(true).optional(),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: true,
        },
        mode: "onTouched",
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    {...field}
                                />
                            </FormControl>
                            {showPassword ? (
                                <HidePasswordIcon
                                    onClick={() => setShowPassword(false)}
                                    size="1em"
                                    className="text-primary absolute right-4 top-10"
                                />
                            ) : (
                                <ShowPasswordIcon
                                    onClick={() => setShowPassword(true)}
                                    size="1em"
                                    className="text-primary absolute right-4 top-10"
                                />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex">
                            <FormControl>
                                <Checkbox
                                    checked={!!field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel
                                style={{ marginBlock: "auto" }}
                                className="my-auto">
                                Remember me
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    Login
                </Button>
            </form>
        </Form>
    );
}
