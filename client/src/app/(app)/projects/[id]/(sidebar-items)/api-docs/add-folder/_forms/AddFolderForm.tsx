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

const formSchema = z.object({
    name: z.string().min(3, "Invalid"),
});

export default function AddFolderForm() {
    const { toast } = useToast();
    const router = useRouter();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
        mode: "onTouched",
    });

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
