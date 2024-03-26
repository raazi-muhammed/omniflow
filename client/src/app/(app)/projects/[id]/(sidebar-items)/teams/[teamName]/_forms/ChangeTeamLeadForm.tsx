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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ITeamMember, InviteStatus } from "@/types/database";
import { useRouter } from "next/navigation";
import { TeamService } from "@/services/api/team.service";
import { makeApiCall } from "@/lib/apicaller";

const formSchema = z.object({
    lead: z.string().min(3, "Invalid"),
});

export default function ChangeTeamLeadForm({
    membersList,
    teamName,
}: {
    membersList: ITeamMember[];
    teamName: string;
}) {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lead: "",
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const service = new TeamService();

        makeApiCall(
            () =>
                service.changeTeamLead({ lead: values.lead, teamName }).exec(),
            { toast, afterSuccess: () => router.refresh() }
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <>
                                            {member.inviteStatus ==
                                            InviteStatus.ACCEPTED ? (
                                                <SelectItem
                                                    value={member.info.email}>
                                                    {`${member.info.name}, ${member.info.email}`}
                                                </SelectItem>
                                            ) : null}
                                        </>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Change lead
                </Button>
            </form>
        </Form>
    );
}
