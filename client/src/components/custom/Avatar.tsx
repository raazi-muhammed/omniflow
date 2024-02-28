import {
    Avatar as AvatarMain,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

type Props = {
    size?: "sm" | "default";
    src: string;
    fallback?: string;
};
export default function Avatar({ src, fallback = "IM", size }: Props) {
    switch (size) {
        case "sm":
            return (
                <AvatarMain className="w-8 h-8">
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
