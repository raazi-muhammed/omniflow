import { ChevronDown as ChevronDownIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
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
import { AuthService } from "@/services/api/auth.service";
import { makeApiCall } from "@/lib/apicaller";

export function UserDropDownMenu({ username }: { username: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    function handleLogout() {
        const service = new AuthService();
        makeApiCall(() => service.userLogOut().exec(), {
            toast,
            afterSuccess: () => {
                dispatch(logout());
                router.push("/login");
            },
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
                <DropdownMenuItem
                    onClick={() => router.push(`/profile/${username}`)}>
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
