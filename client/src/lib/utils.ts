import { type ClassValue, clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateFallbackAvatar(name: string): string {
    if (!name) return "";
    return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

export function getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

type FromType = { type?: "default" | "edit" };
export function canSubmitFrom(
    form: UseFormReturn<any, any, any>,
    options?: FromType
) {
    if (!options) options = { type: "default" };
    switch (options.type) {
        case "edit":
            return (
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                !form.formState.isDirty
            );

        default:
            return !form.formState.isValid || form.formState.isSubmitting;
    }
}
