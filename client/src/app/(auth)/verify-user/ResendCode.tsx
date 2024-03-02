import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import API from "@/lib/client";

export function ResendCode({ email }: { email: string }) {
    const { toast } = useToast();
    async function handleResend() {
        const api = new API();
        const response = await api
            .user()
            .post("/resend-code", { data: { email } });
        toast({
            description: response.message,
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="ms-1 font-bold text-primary hover:underline">
                    resend.
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to resend verification code to{" "}
                        {email}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResend}>
                        Resend
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
