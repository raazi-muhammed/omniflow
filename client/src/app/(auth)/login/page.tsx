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
        <main className="bg-main-pattern">
            <Container className="grid place-items-center min-h-screen">
                <Card className="w-full max-w-lg md:max-w-4xl grid grid-cols-1 min-h-[35rem] md:grid-cols-2">
                    <section className="bg-hero-pattern object-center hidden md:flex flex-col justify-between p-8">
                        <div className="flex gap-2">
                            <AppLogo />
                            <p className="text-semibold">Omniflow</p>
                        </div>
                        <h3 className="text-5xl font-semibold">
                            Build your project faster
                        </h3>
                    </section>
                    <Card className="w-full p-4 border-none py-10 my-auto">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                        <CardFooter>
                            <small className="text-secondary text-center mx-auto">
                                Don't have an account?
                                <Link
                                    href="sign-up"
                                    className="font-bold text-primary underline ms-1">
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
