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
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logUser } from "@/redux/features/authSlice";
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ResendCode } from "../_components/ResendCode";
import { verifyUser } from "@/services/auth.service";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

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
        verifyUser({ code: Number(values.code), email: userEmail || "" })
            .then((response) => {
                toast({
                    description: response.message,
                });
                dispatch(logUser(response.data));
                router.push("/login");
            })
            .catch((error) => {
                toast({
                    description: error,
                });
            });
    }

    return (
        <>
            <CardContent>
                <CardDescription className="-mt-2 mb-3">
                    We have send an email to {userEmail} containing the
                    verification code
                </CardDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="mx-4 mb-2 mt-6">
                                    <FormLabel className="sr-only">
                                        One-Time Password
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            className="flex justify-around"
                                            maxLength={6}
                                            render={({ slots }) => (
                                                <InputOTPGroup className="gap-2">
                                                    {slots.map(
                                                        (slot, index) => (
                                                            <React.Fragment
                                                                key={index}>
                                                                <InputOTPSlot
                                                                    className="rounded-md border"
                                                                    {...slot}
                                                                />
                                                                {index !==
                                                                    slots.length -
                                                                        1 && (
                                                                    <InputOTPSeparator />
                                                                )}
                                                            </React.Fragment>
                                                        )
                                                    )}{" "}
                                                </InputOTPGroup>
                                            )}
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
            </CardContent>
            <CardFooter>
                <small className="mx-auto text-secondary">
                    Did you not receive the code? Kindly request a
                    <ResendCode email={userEmail || ""} />
                </small>
            </CardFooter>
        </>
    );
}
