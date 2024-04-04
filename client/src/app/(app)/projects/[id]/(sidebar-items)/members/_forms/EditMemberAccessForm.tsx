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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { logger } from "@/lib/logger";
import { Label } from "@/components/ui/label";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { TeamService } from "@/services/api/team.service";
import { makeApiCall } from "@/lib/apicaller";
import { IUser } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
    apiDoc: z.number(),
    module: z.number(),
    dbDesign: z.number(),
});

export default function EditMemberAccessForm({ user }: { user: IUser }) {
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: async () => {
            const service = new TeamService();
            const data = await service
                .getMemberAccess({ username: user.username })
                .exec();
            console.log("fo", data.data);
            setRefresh((r) => !r);
            return data.data;
        },
        mode: "onTouched",
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        logger.debug(values);
        const service = new TeamService();
        makeApiCall(
            () =>
                service
                    .changeMemberAccess({
                        access: values,
                        username: user.username,
                    })
                    .exec(),
            {
                toast,
            }
        );
    }

    return (
        <Form {...form}>
            {refresh ||
                (!refresh && (
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4">
                        <FormField
                            control={form.control}
                            name="apiDoc"
                            render={({ field }) => (
                                <FormItem className="border-lg flex justify-between gap-4 rounded-lg bg-muted/50 p-2 align-middle">
                                    <div className="my-auto">
                                        <FormLabel className="my-auto text-base font-normal text-foreground">
                                            API Docs
                                        </FormLabel>
                                        <Label className="ms-2 block">
                                            Change access to API docs
                                        </Label>
                                    </div>
                                    <div>
                                        <Select
                                            onValueChange={(e) => {
                                                field.onChange(Number(e));
                                            }}
                                            defaultValue={String(field.value)}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-32">
                                                    <SelectValue placeholder="Access" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">
                                                    No access
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    Can view
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Can edit
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="module"
                            render={({ field }) => (
                                <FormItem className="border-lg flex justify-between gap-4 rounded-lg bg-muted/50 p-2 align-middle">
                                    <div className="my-auto">
                                        <FormLabel className="my-auto text-base font-normal text-foreground">
                                            Modules
                                        </FormLabel>
                                        <Label className="ms-2 block">
                                            Change access to modules
                                        </Label>
                                    </div>
                                    <div>
                                        <Select
                                            onValueChange={(e) => {
                                                field.onChange(Number(e));
                                            }}
                                            defaultValue={String(field.value)}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-32">
                                                    <SelectValue placeholder="Access" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">
                                                    No access
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    Can view
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Can edit
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dbDesign"
                            render={({ field }) => (
                                <FormItem className="border-lg flex justify-between gap-4 rounded-lg bg-muted/50 p-2 align-middle">
                                    <div className="my-auto">
                                        <FormLabel className="my-auto text-base font-normal text-foreground">
                                            DB Design
                                        </FormLabel>
                                        <Label className="ms-2 block">
                                            Change access to database design
                                        </Label>
                                    </div>
                                    <div>
                                        <Select
                                            onValueChange={(e) => {
                                                field.onChange(Number(e));
                                            }}
                                            defaultValue={String(field.value)}>
                                            <FormControl>
                                                <SelectTrigger className="h-10 w-32">
                                                    <SelectValue placeholder="Access" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="0">
                                                    No access
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    Can view
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Can edit
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <section className="ms-auto flex gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit" className="ms-auto flex">
                                Save changes
                            </Button>
                        </section>
                    </form>
                ))}
        </Form>
    );
}
