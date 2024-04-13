"use client";

import AnimateButton from "@/components/animated/AnimateButton";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { makeApiCall } from "@/lib/apicaller";
import { canSubmitFrom } from "@/lib/utils";
import { TaskService } from "@/services/api/task.service";
import { TeamService } from "@/services/api/team.service";
import { IAllMemberList } from "@/types/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    assignee: z.string().min(1, "Invalid"),
});

export default function ChangeAssignee({ taskId }: { taskId: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const [membersList, setMembersList] = useState<IAllMemberList[] | null>(
        null
    );

    function getMemberDetails({ email }: { email: string }) {
        if (!membersList) return null;
        const data = membersList.find((a) => a.info.email == email);
        if (data?.info) {
            return {
                email: data.info.email,
                username: data.info.username,
                name: data.info.name,
                avatar: data.info.avatar,
            };
        } else {
            return null;
        }
    }

    function loadMembersList() {
        const service = new TeamService();
        service
            .getMembersList()
            .exec()
            .then((response) => {
                setMembersList(response.data as IAllMemberList[]);
                console.log(response.data);
            });
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            assignee: "",
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const assignee = getMemberDetails({ email: values.assignee });
        if (!assignee) {
            toast({ description: "Assignee not found" });
            return;
        }
        const service = new TaskService();
        await makeApiCall(
            () => service.changeTaskAssignee({ taskId, assignee }).exec(),
            {
                toast,
                afterSuccess: () => {
                    router.refresh();
                },
            }
        );
    }
    return (
        <Popover
            onOpenChange={(e) => {
                if (!membersList) {
                    loadMembersList();
                }
            }}>
            <PopoverTrigger className="ms-auto">
                <AnimateButton>
                    <Button size="sm" variant="muted" className="ms-auto">
                        Change assignee
                    </Button>
                </AnimateButton>
            </PopoverTrigger>
            <PopoverContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="assignee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assignee</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a assignee" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {membersList
                                                ? membersList.map((member) => (
                                                      <SelectItem
                                                          key={member.info.id}
                                                          value={
                                                              member.info.email
                                                          }>
                                                          {`${member.info.name}, ${member.info.email}`}
                                                      </SelectItem>
                                                  ))
                                                : null}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            disabled={canSubmitFrom(form)}>
                            <AnimatedSpinner
                                isLoading={form.formState.isSubmitting}
                            />
                            Change
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}
