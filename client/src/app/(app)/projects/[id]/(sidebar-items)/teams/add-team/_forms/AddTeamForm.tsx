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
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IAllMemberList } from "@/types/database";
import { useRouter } from "next/navigation";
import { TeamService } from "@/services/api/team.service";
import { logger } from "@/lib/logger";
import { makeApiCall } from "@/lib/apicaller";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { canSubmitFrom } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    lead: z.string().min(3, "Invalid"),
});

export default function AddTeamForm() {
    const { toast } = useToast();
    const [membersList, setMembersList] = useState<IAllMemberList[]>([]);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lead: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        const service = new TeamService();
        service
            .getMembersList()
            .exec()
            .then((response) => {
                console.log(response.data);

                setMembersList(response.data as IAllMemberList[]);
            })
            .catch((err) => console.log(err));
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new TeamService();
        await makeApiCall(() => service.addTeam(values).exec(), {
            toast,
            afterSuccess: () => {
                router.back();
                router.refresh();
            },
            afterError: (error: any) => {
                const sanitizedError: string = error.toLowerCase();
                if (sanitizedError.includes("name")) {
                    form.setError("name", { message: error });
                }
            },
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
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                                <Input placeholder="team name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lead"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lead</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a lead" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {membersList.map((member) => (
                                        <SelectItem
                                            key={member.info.id}
                                            value={member.info.email}>
                                            {`${member.info.name}, ${member.info.email}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-full"
                    type="submit"
                    disabled={canSubmitFrom(form)}>
                    <AnimatedSpinner isLoading={form.formState.isSubmitting} />
                    Add team
                </Button>
            </form>
        </Form>
    );
}
