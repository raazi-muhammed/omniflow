import { type ClassValue, clsx } from "clsx";
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
