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
import { useRouter } from "next/navigation";
import { AddIcon } from "@/lib/icons";
import { logger } from "@/lib/logger";
import { makeApiCall } from "@/lib/apicaller";
import { ApiDocService } from "@/services/api/api-doc.service";
import { useEffect, useState } from "react";
import { IFolder } from "@/types/database";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
    parentFolder: z.string().optional(),
});

export default function AddFolderForm() {
    const { toast } = useToast();
    const router = useRouter();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const [folderList, setFolderList] = useState<IFolder[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            parentFolder: "",
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
        logger.debug(values);

        const service = new ApiDocService();
        makeApiCall(() => service.addFolder(values).exec(), {
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
