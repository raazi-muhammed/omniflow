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
import {
    deleteMeetingNotes,
    editMeetingNotes,
} from "@/services/meeting.service";
import { useRouter } from "next/navigation";
import { DeleteAlert } from "@/components/custom/DeleteAlert";

const FormSchema = z.object({
    notes: z.string().min(10),
});

export default function EditNoteForm({
    meetingId,
    notes,
    closeDialog,
}: {
    meetingId: string;
    notes: string;
    closeDialog: () => void;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            notes,
        },
    });
    const { toast } = useToast();
    const route = useRouter();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        makeApiCall(
            () => editMeetingNotes({ id: meetingId }, { notes: data.notes }),
            {
                toast,
                afterSuccess: () => {
                    route.refresh();
                    closeDialog();
                },
            }
        );
    }

    function handleDelete() {
        makeApiCall(() => deleteMeetingNotes({ id: meetingId }), {
            toast,
            afterSuccess: () => {
                route.refresh();
                closeDialog();
            },
        });
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
                <div className="flex justify-between">
                    <DeleteAlert handleDelete={handleDelete} />
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Form>
    );
}
