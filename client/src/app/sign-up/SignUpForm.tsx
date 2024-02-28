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

const formSchema = z
    .object({
        name: z.string().min(3, "Invalid"),
        username: z.string().min(3, "Invalid"),
        email: z.string().email(),
        password: z.string().min(7, "Password should be at least 7 characters"),
        confirmPassword: z
            .string()
            .min(7, "Password should be at least 7 characters"),
        acceptTerms: z
            .boolean()
            .default(true)
            .refine((data) => data === true, {
                message: "You must accept terms and conditions",
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            acceptTerms: true,
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
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="confirm password"
                                    {...field}
                                />
                            </FormControl>
                            {showConfirmPassword ? (
                                <HidePasswordIcon
                                    onClick={() =>
                                        setShowConfirmPassword(false)
                                    }
                                    size="1em"
                                    className="text-primary absolute right-4 top-10"
                                />
                            ) : (
                                <ShowPasswordIcon
                                    onClick={() => setShowConfirmPassword(true)}
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
                    name="acceptTerms"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex">
                                <FormControl>
                                    <Checkbox
                                        checked={!!field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel
                                    style={{ marginBlock: "auto" }}
                                    className="my-auto">
                                    Accept terms and conditions
                                </FormLabel>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
