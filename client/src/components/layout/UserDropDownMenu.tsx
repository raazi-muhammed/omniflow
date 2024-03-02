import { AwardIcon, ChevronDown as ChevronDownIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import API from "@/lib/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";

export function UserDropDownMenu() {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    async function handleLogout() {
        const api = new API();
        const response = await api.user().post("/logout", { data: {} });
        toast({
            description: response.message || "User logged out",
        });
        dispatch(logout());
        router.push("/login");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="px-2">
                    <ChevronDownIcon
                        size="1em"
                        className="my-auto text-secondary"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
