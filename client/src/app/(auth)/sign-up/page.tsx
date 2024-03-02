import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import AppLogo from "@/components/custom/AppLogo";
import Container from "@/components/layout/Container";

export default function page() {
    return (
        <main className="bg-main-pattern">
            <Container className="flex min-h-screen justify-around">
                <section className="object-center hidden md:flex flex-col justify-between py-24">
                    <div className="flex gap-2">
                        <AppLogo />
                        <p className="text-semibold">Omniflow</p>
                    </div>
                    <h3 className="text-5xl font-semibold">
                        Build your <br /> project faster
                    </h3>
                </section>
                <Card className="w-full max-w-md p-4 h-fit my-auto">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                    <CardFooter>
                        <small className="text-secondary text-center mx-auto">
                            Already have an account?
                            <Link
                                href="login"
                                className="font-bold text-primary underline ms-1">
                                Login
                            </Link>
                        </small>
                    </CardFooter>
                </Card>
            </Container>
        </main>
    );
}
