import { ReactNode } from "react";

export default function FormWrapper({ children }: { children: ReactNode }) {
    return <div className="mx-auto w-full max-w-2xl">{children}</div>;
}
