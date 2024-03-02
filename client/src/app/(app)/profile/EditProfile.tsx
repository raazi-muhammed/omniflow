import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";
import { IUser } from "@/types/database";

export default function EditProfile({ user }: { user: IUser }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4 w-full" variant="secondary">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <EditProfileForm user={user} />
            </DialogContent>
        </Dialog>
    );
}
