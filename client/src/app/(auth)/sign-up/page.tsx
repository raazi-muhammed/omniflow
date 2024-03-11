import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "./_forms/SignUpForm";
import AppLogo from "@/components/custom/AppLogo";
import Container from "@/components/layout/Container";

export default function page() {
    return (
        <main className="bg-gradient-to-tr from-[#100730] from-0% via-black via-30% to-[#100730] to-100%">
            <Container className="flex min-h-screen justify-around">
                <section className="hidden flex-col justify-between object-center py-24 md:flex">
                    <div className="flex gap-2">
                        <AppLogo />
                        <p className="text-semibold">Omniflow</p>
                    </div>
                    <h3 className="text-5xl font-semibold">
                        Build your <br /> project faster
                    </h3>
                </section>
                <Card className="my-auto h-fit w-full max-w-md p-4">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                    <CardFooter>
                        <small className="mx-auto text-center text-secondary">
                            Already have an account?
                            <Link
                                href="login"
                                className="ms-1 font-bold text-primary underline">
                                Login
                            </Link>
                        </small>
                    </CardFooter>
                </Card>
            </Container>
        </main>
    );
}
