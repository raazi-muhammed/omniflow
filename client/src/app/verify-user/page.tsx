import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import VerifyForm from "./VerifyForm";

export default function page() {
    return (
        <main className="grid min-h-screen w-full place-items-center bg-main-pattern">
            <Card className="m-auto my-auto h-fit w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Verify your account</CardTitle>
                    <CardDescription>
                        We have send a verification to your mail
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <VerifyForm />
                </CardContent>
            </Card>
        </main>
    );
}
