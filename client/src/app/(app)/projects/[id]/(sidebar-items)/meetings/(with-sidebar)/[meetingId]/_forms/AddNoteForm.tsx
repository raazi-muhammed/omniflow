"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { makeApiCall } from "@/lib/apicaller";
import { useRouter } from "next/navigation";
import { MeetingService } from "@/services/api/meeting.service";

const FormSchema = z.object({
    notes: z.string().min(10),
});

export default function AddNoteForm({ moduleId }: { moduleId: string }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            notes: "",
        },
    });
    const { toast } = useToast();
    const route = useRouter();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const service = new MeetingService();
        makeApiCall(
            () =>
                service.addMeetingNotes(moduleId, { notes: data.notes }).exec(),
            {
                toast,
                afterSuccess: () => {
                    route.refresh();
                },
            }
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea placeholder="notes" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="me-0 ms-auto flex" type="submit">
                    Add
                </Button>
            </form>
        </Form>
    );
}
