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
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/redux/store";
import { IUser } from "@/types/database";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/api/user.service";
import { TeamService } from "@/services/api/team.service";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { canSubmitFrom } from "@/lib/utils";
import { makeApiCall } from "@/lib/apicaller";
import { IResponse } from "@/services/api/utils";

const formSchema = z.object({
    email: z.string().email(),
    message: z.string().min(5),
});

export default function InviteMemberForm() {
    const { toast } = useToast();
    const router = useRouter();
    const myName =
        useAppSelector((state) => state.authReducer).userData?.name || "User";
    const projectName =
        useAppSelector((state) => state.projectReducer).projectData?.title ||
        "Project";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: `${myName} is inviting to join on the project ${projectName}`,
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new UserService();
        await makeApiCall(() => service.getPublicUser(values.email).exec(), {
            toast,
            afterSuccess: async (response: IResponse) => {
                const userDetails: IUser = response.data;

                if (!userDetails.email || !userDetails.name) {
                    form.setError("email", { message: "Invalid user" });
                    return;
                }

                const teamService = new TeamService();
                await makeApiCall(
                    () =>
                        teamService
                            .inviteMemberToTeam({
                                email: userDetails.email,
                                username: userDetails.username,
                                avatar: userDetails.avatar,
                                name: userDetails.name,
                                message: values.message,
                            })
                            .exec(),
                    {
                        toast,
                        afterSuccess: () => {
                            router.back();
                            router.refresh();
                        },
                    }
                );
            },
            afterError: (error: any) => {
                const sanitizedError: string = error.toLowerCase();
                if (sanitizedError.includes("user")) {
                    form.setError("email", { message: error });
                } else {
                    toast({
                        description: error || "Error",
                    });
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
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="message" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full"
                    type="submit"
                    disabled={canSubmitFrom(form)}>
                    <AnimatedSpinner isLoading={form.formState.isSubmitting} />
                    Invite
                </Button>
            </form>
        </Form>
    );
}
