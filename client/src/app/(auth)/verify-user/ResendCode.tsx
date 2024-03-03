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
import { resendCode } from "@/services/auth.service";

export function ResendCode({ email }: { email: string }) {
    const { toast } = useToast();
    function handleResend() {
        resendCode({ email })
            .then((response) => {
                toast({
                    description: response.message,
                });
            })
            .catch((error) => {
                toast({
                    description: error,
                });
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
