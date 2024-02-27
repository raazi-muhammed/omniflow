"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <main>
            <p>Hello world</p>
            <Button>Click me</Button>
        </main>
    );
}
