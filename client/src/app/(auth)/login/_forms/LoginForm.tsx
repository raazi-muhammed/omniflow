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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logUser } from "@/redux/features/authSlice";
import { AuthService } from "@/services/api/auth.service";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";
import AnimateButton from "@/components/animated/AnimateButton";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7, "Password should be at least 7 characters"),
    rememberMe: z.boolean().default(true).optional(),
});

export default function LoginForm() {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: true,
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new AuthService();
        await makeApiCall(() => service.userLogin(values).exec(), {
            toast,
            afterSuccess: (response: IResponse) => {
                dispatch(logUser(response.data));
                router.push("/projects");
                router.refresh();
            },
            afterError: (error: any) => {
                const sanitizedError: string = error.toLowerCase();
                if (sanitizedError.includes("user")) {
                    form.setError("email", { message: error });
                } else if (sanitizedError.includes("password")) {
                    form.setError("password", { message: error });
                }
            },
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
                                    className="absolute right-4 top-10 text-primary"
                                />
                            ) : (
                                <ShowPasswordIcon
                                    onClick={() => setShowPassword(true)}
                                    size="1em"
                                    className="absolute right-4 top-10 text-primary"
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
                <AnimateButton className="w-full">
                    <Button
                        disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                        }
                        className="w-full"
                        type="submit">
                        <AnimatedSpinner
                            isLoading={form.formState.isSubmitting}
                        />
                        Login
                    </Button>
                </AnimateButton>
            </form>
        </Form>
    );
}
