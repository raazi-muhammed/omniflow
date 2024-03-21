import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AppLogo from "@/components/custom/AppLogo";
import LoginForm from "./_forms/LoginForm";
import Container from "@/components/layout/Container";

export default function Login() {
    return (
        <main className="bg-gradient-to-tr from-[#100730] from-0% via-black via-30% to-[#100730] to-100%">
            <Container className="grid min-h-screen place-items-center">
                <Card className="grid min-h-[35rem] w-full max-w-lg grid-cols-1 md:max-w-4xl md:grid-cols-2">
                    <section className="hidden flex-col justify-between bg-hero-pattern object-center p-8 md:flex">
                        <div className="flex gap-2">
                            <AppLogo />
                            <p className="text-semibold">Omniflow</p>
                        </div>
                        <h3 className="text-5xl font-semibold">
                            Build your project faster
                        </h3>
                    </section>
                    <Card className="my-auto w-full border-none p-4 py-10">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                        <CardFooter>
                            <small className="mx-auto text-center text-secondary">
                                Don&apos;t have an account?
                                <Link
                                    href="sign-up"
                                    className="ms-1 font-bold text-primary underline">
                                    Sign up
                                </Link>
                            </small>
                        </CardFooter>
                    </Card>
                </Card>
            </Container>
        </main>
    );
}
