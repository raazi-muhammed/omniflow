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
import { DeleteAlert } from "@/components/custom/DeleteAlert";
import { MeetingService } from "@/services/api/meeting.service";
import AnimatedSpinner from "@/components/custom/AnimatedSpinner";
import { canSubmitFrom } from "@/lib/utils";

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

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const service = new MeetingService();
        await makeApiCall(
            () =>
                service
                    .editMeetingNotes(meetingId, { notes: data.notes })
                    .exec(),
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
        const service = new MeetingService();
        makeApiCall(() => service.deleteMeetingNotes(meetingId).exec(), {
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
                    <Button
                        type="submit"
                        disabled={canSubmitFrom(form, { type: "edit" })}>
                        <AnimatedSpinner
                            isLoading={form.formState.isSubmitting}
                        />
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
