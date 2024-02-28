import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AppLogo from "@/components/custom/AppLogo";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Login() {
    return (
        <main
            className={`bg-hero-pattern min-h-screen grid place-items-center`}>
            <Card className="w-full max-w-lg md:max-w-4xl grid grid-cols-1 min-h-[35rem] md:grid-cols-2">
                <section className="overflow-hidden hidden relative md:block">
                    <Image
                        className="rounded border h-full w-full object-cover"
                        priority={true}
                        src="/bg-pattern.svg"
                        width={500}
                        height={500}
                        alt=""
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-8">
                        <div className="flex gap-2">
                            <AppLogo />
                            <p className="text-semibold">Omniflow</p>
                        </div>
                        <h3 className="text-5xl font-semibold">
                            Build your project faster
                        </h3>
                    </div>
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
        </main>
    );
}
