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
import { makeApiCall } from "@/lib/apicaller";
import { UserService } from "@/services/api/user.service";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { canSubmitFrom } from "@/lib/utils";

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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = new FormData();
        data.append("name", values.name);
        if (values.picture) {
            data.append("avatar", values.picture[0]);
        }

        const service = new UserService();

        await makeApiCall(
            () => service.editUserProfile(user.username, data).exec(),
            {
                toast,
            }
        );
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
                    disabled={canSubmitFrom(form, { type: "edit" })}
                    className="w-full"
                    type="submit">
                    <AnimatedSpinner isLoading={form.formState.isSubmitting} />
                    Save
                </Button>
            </form>
        </Form>
    );
}
