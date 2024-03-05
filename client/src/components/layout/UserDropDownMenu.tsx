import { ChevronDown as ChevronDownIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { userLogOut } from "@/services/auth.service";
import { error } from "console";

export function UserDropDownMenu() {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    function handleLogout() {
        userLogOut()
            .then((response) => {
                toast({
                    description: response.message || "User logged out",
                });
                dispatch(logout());
                router.push("/login");
            })
            .catch((error) => {
                toast({
                    description: error || "User logged out failed",
                });
            });
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
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/projects")}>
                    Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
