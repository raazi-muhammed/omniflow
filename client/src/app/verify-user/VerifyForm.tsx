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
import API from "@/lib/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logUser } from "@/redux/features/authSlice";

const formSchema = z.object({
    code: z
        .string()
        .min(3, "Invalid")
        .refine((code) => Number(code)),
});

export default function VerifyForm() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const userEmail = searchParams.get("email");

    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const api = new API();
        const response = await api.auth().post("/verify-user", {
            data: { code: Number(values.code), email: userEmail },
        });

        if (response.success) {
            toast({
                description: response.message || "Verification successful",
            });
            dispatch(logUser(response.data));
            router.push("/login");
        } else {
            toast({
                title: "Verification failed",
                description: response.message || "failed",
            });
        }
    }

    return (
        <>
            <p>{userEmail}</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="code"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit">
                        Verify
                    </Button>
                </form>
            </Form>
        </>
    );
}
