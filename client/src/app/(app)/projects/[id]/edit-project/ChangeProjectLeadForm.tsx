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
import { getMembersList } from "@/services/team.service";
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
import { changeProjectLead } from "@/services/project.service";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    lead: z.string().min(3, "Invalid"),
});

export default function ChangeProjectLeadForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [membersList, setMembersList] = useState<IAllMemberList[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lead: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        getMembersList().then((response) => {
            console.log(response.data);
            setMembersList(response.data as IAllMemberList[]);
        });
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        changeProjectLead(values)
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
                                        <SelectItem value={member.info.email}>
                                            {`${member.info.name}, ${member.info.email}`}
                                        </SelectItem>
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
