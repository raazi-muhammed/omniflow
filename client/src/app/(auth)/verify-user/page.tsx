import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import VerifyForm from "./_forms/VerifyForm";

export default function page() {
    return (
        <main className="grid min-h-screen w-full place-items-center bg-gradient-to-tr from-[#100730] from-0% via-black via-30% to-[#100730] to-100%">
            <Card className="m-auto my-auto h-fit w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Verify your account</CardTitle>
                </CardHeader>
                <VerifyForm />
            </Card>
        </main>
    );
}
