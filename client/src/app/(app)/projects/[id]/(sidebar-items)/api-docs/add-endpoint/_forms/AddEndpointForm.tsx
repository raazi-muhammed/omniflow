"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AddIcon } from "@/lib/icons";
import { ApiDocService } from "@/services/api/api-doc.service";
import { makeApiCall } from "@/lib/apicaller";
import { useEffect, useState } from "react";
import { IFolder } from "@/types/database";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    summary: z.string().min(3, "Invalid"),
    route: z.string().min(3, "Invalid"),
    method: z.string(),
    parentFolder: z.string().optional(),
});

export default function AddEndpointForm() {
    const { toast } = useToast();
    const [folderList, setFolderList] = useState<IFolder[]>([]);

    const router = useRouter();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            summary: "",
            route: "",
            parentFolder: "",
            method: "GET",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        const service = new ApiDocService();
        service
            .getFolderList()
            .exec()
            .then((res) => {
                setFolderList(res.data);
            });
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const service = new ApiDocService();

        makeApiCall(() => service.addEndpoint(values).exec(), {
            toast,
            afterSuccess: () => {
                router.back();
                router.refresh();
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
                    name="route"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Route</FormLabel>
                            <FormControl>
                                <Input placeholder="route" {...field} />
                            </FormControl>
                            <FormDescription>
                                use {`{}`} to assign a variables
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="parentFolder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parent folder</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a parent folder" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {folderList.map((folder) => (
                                            <SelectItem
                                                key={folder.id}
                                                value={folder.id}>
                                                {folder.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="GET">GET</SelectItem>
                                        <SelectItem value="POST">
                                            POST
                                        </SelectItem>
                                        <SelectItem value="PUT">PUT</SelectItem>
                                        <SelectItem value="PATCH">
                                            PATCH
                                        </SelectItem>
                                        <SelectItem value="DELETE">
                                            DELETE
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Textarea placeholder="summary" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="ms-auto flex w-fit gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}>
                        Cancel
                    </Button>

                    <Button type="submit">
                        <AddIcon />
                        Add
                    </Button>
                </div>
            </form>
        </Form>
    );
}
