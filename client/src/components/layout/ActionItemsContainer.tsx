import { ReactNode } from "react";

type Prop = {
    children: ReactNode;
};
export default function ActionItemsContainer({ children }: Prop) {
    return (
        <section className="my-8 ms-auto flex w-fit justify-end gap-4">
            {children}
        </section>
    );
}
