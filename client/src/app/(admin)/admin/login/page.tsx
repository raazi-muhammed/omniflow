import Container from "@/components/layout/Container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import AdminLoginForm from "./_forms/AdminLoginForm";

export default function page() {
    return (
        <main>
            <Container className="grid min-h-screen place-items-center">
                <Card className="w-full max-w-md">
                    <CardHeader>Admin login</CardHeader>
                    <CardContent>
                        <AdminLoginForm />
                    </CardContent>
                </Card>
            </Container>
        </main>
    );
}
