import {
    Avatar as AvatarMain,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

type Props = {
    size?: "sm" | "default" | "lg";
    src: string;
    fallback?: string;
};
export default function Avatar({ src, fallback = "IM", size }: Props) {
    switch (size) {
        case "sm":
            return (
                <AvatarMain className="h-8 w-8">
                    <AvatarImage src={src} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </AvatarMain>
            );
        case "lg":
            return (
                <AvatarMain className="h-36 w-36 border">
                    <AvatarImage src={src} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </AvatarMain>
            );
        default:
            return (
                <AvatarMain>
                    <AvatarImage src={src} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </AvatarMain>
            );
    }
}
